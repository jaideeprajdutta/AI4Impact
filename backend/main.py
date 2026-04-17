# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from ml.model import build_index, search

app = FastAPI()

# -------------------------
# ADD THESE MAPS
# -------------------------

materials_map = {
    "plumber": ["pipes", "sealant", "wrench"],
    "electrician": ["wires", "switch", "tester"],
    "carpenter": ["wood", "nails", "hammer"],
    "ac technician": ["gas", "filters", "tools"],
    "painter": ["paint", "brush", "roller"],
    "mechanic": ["oil", "spare parts", "tools"],
    "cleaner": ["cleaning solution", "cloth", "mop"],
    "appliance repair": ["tools", "spare parts"],
    "pest control": ["chemicals", "sprayer"]
}

cost_map = {
    "plumber": "₹300–₹800",
    "electrician": "₹400–₹1000",
    "carpenter": "₹500–₹1500",
    "ac technician": "₹600–₹2000",
    "painter": "₹1000–₹5000",
    "mechanic": "₹300–₹1200",
    "cleaner": "₹200–₹600",
    "appliance repair": "₹400–₹1500",
    "pest control": "₹800–₹3000"
}

# -------------------------
# LOAD MODEL
# -------------------------

print("Loading model and building index...")
index, data, embeddings = build_index()
print("Ready!")

# -------------------------
# REQUEST SCHEMA
# -------------------------

class QueryRequest(BaseModel):
    query: str

# -------------------------
# ROUTES
# -------------------------

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


@app.post("/recommend")
def recommend(req: QueryRequest):
    results = search(req.query, index, data)

    enriched = []

    for r in results:
        skill = r["skill"]

        # Improve score using rating
        score = r["score"] + (r["rating"] * 0.05)

        enriched.append({
            "name": r["name"],
            "skill": skill,
            "location": r["location"],
            "rating": r["rating"],
            "score": round(score, 3),
            "cost_estimate": cost_map.get(skill, "₹500–₹1500"),
            "materials": materials_map.get(skill, []),
            "description": r["description"]
        })

    return {"results": enriched}