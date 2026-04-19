from fastapi import APIRouter
from backend.db import cursor, conn

router = APIRouter()


# ✅ LIST ALL WORKERS (for worker picker on frontend)
@router.get("/workers")
def list_workers():
    workers = cursor.execute(
        "SELECT id, name, skill, location, rating, status FROM workers ORDER BY id ASC"
    ).fetchall()
    return {"workers": [dict(w) for w in workers]}


# ✅ GET A SINGLE JOB BY ID (with targeted worker info)
@router.get("/jobs/{job_id}")
def get_job(job_id: int):
    job = cursor.execute("SELECT * FROM jobs WHERE id=?", (job_id,)).fetchone()
    if not job:
        return {"error": "Job not found"}
    job_dict = dict(job)

    # worker_id holds the target_worker_id on creation
    worker_id = job_dict.get("worker_id")
    if worker_id:
        worker = cursor.execute(
            "SELECT id, name, skill, location, rating FROM workers WHERE id=?", (worker_id,)
        ).fetchone()
        job_dict["worker"] = dict(worker) if worker else None
    else:
        job_dict["worker"] = None

    return job_dict


# ✅ CREATE JOB
# Accepts optional target_worker_id to target a specific worker
@router.post("/jobs/create")
def create_job(data: dict):
    target_id = data.get("target_worker_id")
    print(f"\n==========================================")
    print(f"🎯 NEW BOOKING REQUESTED -> WORKER ID: {target_id}")
    print(f"==========================================\n")
    
    cursor.execute("""
        INSERT INTO jobs (worker_id, description, required_skill, location, status, price)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        target_id,   # None = open to all; set = targeted
        data.get("description"),
        data.get("required_skill"),
        data.get("location"),
        "open",
        data.get("price", 500)
    ))

    conn.commit()
    return {"message": "Job created", "job_id": cursor.lastrowid}


# 🔍 GET AVAILABLE JOBS for a worker
# Shows jobs matching the worker's skill+location OR jobs targeted directly at this worker
@router.get("/jobs/available/{worker_id}")
def get_jobs(worker_id: int):
    worker = cursor.execute(
        "SELECT * FROM workers WHERE id=?", (worker_id,)
    ).fetchone()

    if not worker:
        return {"jobs": [], "error": "Worker not found"}

    jobs = cursor.execute("""
        SELECT * FROM jobs
        WHERE (status='open' AND ((required_skill=? AND location=?) OR worker_id=?))
           OR (worker_id=? AND status != 'open')
    """, (worker["skill"], worker["location"], worker_id, worker_id)).fetchall()

    return {"worker": dict(worker), "jobs": [dict(j) for j in jobs]}


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