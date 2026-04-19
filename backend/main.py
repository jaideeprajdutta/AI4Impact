from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db import init_db, load_workers_from_json, optimize_db
from backend.worker_routes import router as worker_router
from backend.job_routes import router as job_router
from backend.ml_routes import router as ml_router

app = FastAPI()

# CORS — allow all origins for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

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