from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np

from sentence_transformers import SentenceTransformer
from backend.db import cursor

router = APIRouter()

model = SentenceTransformer('all-MiniLM-L6-v2')


# -------------------------
# REQUEST
# -------------------------

class QueryRequest(BaseModel):
    query: str


# -------------------------
# SAFE LOAD WORKERS
# -------------------------

def load_workers():
    rows = cursor.execute("SELECT * FROM workers").fetchall()
    return [dict(r) for r in rows]


# -------------------------
# BUILD EMBEDDINGS
# -------------------------

def build_embeddings(data):
    if not data:
        return np.array([])

    texts = [
        f"{w['skill']} worker in {w['location']} with rating {w['rating']}"
        for w in data
    ]

    embs = model.encode(texts)

    if len(embs.shape) == 1:
        embs = np.expand_dims(embs, axis=0)

    norms = np.linalg.norm(embs, axis=1, keepdims=True)
    norms[norms == 0] = 1

    return embs / norms


# -------------------------
# SEARCH (DB + embeddings)
# -------------------------

def search(query):
    workers_data = load_workers()

    if not workers_data:
        return []

    embeddings = build_embeddings(workers_data)

    q = model.encode([query])
    q = q / np.linalg.norm(q)

    sims = np.dot(embeddings, q.T).flatten()
    top_idx = sims.argsort()[::-1][:5]

    results = []

    for i in top_idx:
        w = workers_data[i]
        similarity = float(sims[i])
        rating = w.get("rating", 4.0)

        score = (0.85 * similarity) + (0.15 * (rating / 5))

        results.append({
            "name": w["name"],
            "skill": w["skill"],
            "location": w["location"],
            "rating": rating,
            "status": w["status"],
            "score": round(score, 3)
        })

    return results


# -------------------------
# ROUTE
# -------------------------

@router.post("/recommend")
def recommend(req: QueryRequest):
    try:
        return {"results": search(req.query)}
    except Exception as e:
        return {"error": str(e)}