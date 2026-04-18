from fastapi import APIRouter
from backend.db import cursor, conn

router = APIRouter()

# ✅ CREATE JOB
@router.post("/jobs/create")
def create_job(data: dict):
    cursor.execute("""
        INSERT INTO jobs (worker_id, description, required_skill, location, status, price)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        None,
        data.get("description"),
        data.get("required_skill"),
        data.get("location"),
        "open",
        data.get("price", 500)
    ))

    conn.commit()
    return {"message": "Job created", "job_id": cursor.lastrowid}


# 🔍 GET AVAILABLE JOBS
@router.get("/jobs/available/{worker_id}")
def get_jobs(worker_id: int):
    worker = cursor.execute(
        "SELECT * FROM workers WHERE id=?", (worker_id,)
    ).fetchone()

    jobs = cursor.execute("""
        SELECT * FROM jobs
        WHERE status='open'
        AND required_skill=?
        AND location=?
    """, (worker["skill"], worker["location"])).fetchall()

    return {"jobs": [dict(j) for j in jobs]}


# ✅ ACCEPT JOB
@router.post("/jobs/accept")
def accept_job(data: dict):
    cursor.execute("""
        UPDATE jobs
        SET worker_id=?, status='assigned'
        WHERE id=?
    """, (data["worker_id"], data["job_id"]))

    conn.commit()
    return {"message": "Job accepted"}