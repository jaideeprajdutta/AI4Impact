# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from ml.model import build_index, search

app = FastAPI()

# -------------------------
# MATERIALS MAP
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

# -------------------------
# DYNAMIC COST FUNCTION
# -------------------------

def estimate_cost(skill, years, rating):
    base_ranges = {
        "plumber": (300, 800),
        "electrician": (400, 1000),
        "carpenter": (500, 1500),
        "ac technician": (600, 2000),
        "painter": (1000, 5000),
        "mechanic": (300, 1200),
        "cleaner": (200, 600),
        "appliance repair": (400, 1500),
        "pest control": (800, 3000)
    }

    low, high = base_ranges.get(skill, (500, 1500))

    # Safe guards
    years = max(1, years)
    rating = max(3.5, min(rating, 5.0))

    exp_factor = 1 + (years / 20)
    rating_factor = 1 + ((rating - 3.5) / 5)

    final_low = int(low * exp_factor * rating_factor)
    final_high = int(high * exp_factor * rating_factor)

    return f"₹{final_low}–₹{final_high}"


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
    try:
        results = search(req.query, index, data)
        enriched = []

        for r in results:
            skill = r.get("skill", "unknown")

            # SAFE parsing
            try:
                years = int(r.get("experience", "1").split()[0])
            except:
                years = 1

            rating = r.get("rating", 4.0)

            cost = estimate_cost(skill, years, rating)

            score = r.get("score", 0) + (rating * 0.05)

            enriched.append({
                "name": r.get("name", "unknown"),
                "skill": skill,
                "location": r.get("location", "unknown"),
                "availability": r.get("availability", "unknown"),
                "rating": rating,
                "score": round(score, 3),
                "cost_estimate": cost,
                "materials": materials_map.get(skill, []),
                "description": r.get("description", "")
            })

        return {"results": enriched}

    except Exception as e:
        return {"error": str(e)}