from fastapi import APIRouter
from backend.db import cursor, conn
from ml.worker_model import detect_intent

router = APIRouter()

@router.post("/worker/command")
def worker_command(data: dict):
    text = data.get("text")
    worker_id = data.get("worker_id")

    intent, confidence = detect_intent(text)

    if intent == "set_available":
        cursor.execute("UPDATE workers SET status='available' WHERE id=?", (worker_id,))
        conn.commit()
        return {"response": "You are now available"}

    elif intent == "set_busy":
        cursor.execute("UPDATE workers SET status='busy' WHERE id=?", (worker_id,))
        conn.commit()
        return {"response": "You are now busy"}

    elif intent == "show_jobs":
        jobs = cursor.execute(
            "SELECT * FROM jobs WHERE worker_id=? AND status='assigned'",
            (worker_id,)
        ).fetchall()

        return {"jobs": [dict(j) for j in jobs]}

    elif intent == "complete_job":
        cursor.execute(
            "UPDATE jobs SET status='completed' WHERE worker_id=? AND status='assigned'",
            (worker_id,)
        )
        conn.commit()
        return {"response": "Job completed"}

    return {"response": "Didn't understand"}