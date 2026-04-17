# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from ml.model import build_index, search

app = FastAPI()

# Load model + index once at startup
print("Loading model and building index...")
index, data, embeddings = build_index()
print("Ready!")

# Request schema
class QueryRequest(BaseModel):
    query: str


@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


@app.post("/recommend")
def recommend(req: QueryRequest):
    results = search(req.query, index, data)
    return {"results": results}