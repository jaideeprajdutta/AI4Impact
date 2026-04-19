# ml/model.py

import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.neighbors import NearestNeighbors

# -------------------------
# PATHS
# -------------------------

DATA_PATH = os.path.join("data", "_large_workers_dataset.json")

# -------------------------
# LOAD MODEL
# -------------------------

model = SentenceTransformer('paraphrase-MiniLM-L3-v2')

# -------------------------
# LOAD DATA
# -------------------------

def load_data():
    with open(DATA_PATH, "r") as f:
        return json.load(f)


# -------------------------
# BUILD INDEX (COSINE)
# -------------------------

def build_index():
    data = load_data()

    texts = [worker["description"] for worker in data]

    print("Generating embeddings...")

    embeddings = model.encode(texts)

    # 🔥 Normalize embeddings (VERY IMPORTANT for cosine)
    embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

    # Build index with cosine metric
    index = NearestNeighbors(n_neighbors=5, metric='cosine')
    index.fit(embeddings)

    print("Index built!")

    return index, data, embeddings


# -------------------------
# SEARCH FUNCTION
# -------------------------

def search(query, index, data, k=5):
    # Encode query
    query_vec = model.encode([query])

    # 🔥 Normalize query
    query_vec = query_vec / np.linalg.norm(query_vec, axis=1, keepdims=True)
 
    # Get nearest neighbors
    distances, indices = index.kneighbors(query_vec, n_neighbors=k)

    results = []

    for i, idx in enumerate(indices[0]):
        worker = data[idx]

        # 🔥 Convert cosine distance → similarity
        similarity = 1 - distances[0][i]

        results.append({
            "name": worker["name"],
            "skill": worker["skill"],
            "location": worker["location"],
            "availability": worker["availability"],
            "rating": worker["rating"],
            "description": worker["description"],
            "score": round(float(similarity), 3)
        })

    return results


# -------------------------
# TEST RUN
# -------------------------

if __name__ == "__main__":
    index, data, embeddings = build_index()

    query = "Need electrician for wiring issue"
    results = search(query, index, data)

    for r in results:
        print(r)