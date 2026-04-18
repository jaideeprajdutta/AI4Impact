from fastapi import FastAPI

from backend.db import init_db, load_workers_from_json, optimize_db
from backend.worker_routes import router as worker_router
from backend.job_routes import router as job_router
from backend.ml_routes import router as ml_router

app = FastAPI()

# Init DB
init_db()
optimize_db()
load_workers_from_json()

# Routes
app.include_router(worker_router)
app.include_router(job_router)
app.include_router(ml_router)


@app.get("/")
def root():
    return {"message": "Backend running 🚀"}