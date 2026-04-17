# ml/model.py

import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.neighbors import NearestNeighbors

# Paths
DATA_PATH = os.path.join("data", "workers_dataset.json")

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

def load_data():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

def build_index():
    data = load_data()

    texts = [worker["description"] for worker in data]

    print("Generating embeddings...")
    embeddings = model.encode(texts)

    embeddings = np.array(embeddings)

    # Build sklearn index
    index = NearestNeighbors(n_neighbors=5, metric='euclidean')
    index.fit(embeddings)
    print("Index built!")
    return index, data, embeddings


def search(query, index, data, k=5):
    query_vec = model.encode([query])

    distances, indices = index.kneighbors(query_vec, n_neighbors=k)

    results = []
    for i, idx in enumerate(indices[0]):
        worker = data[idx]
        score = float(1 / (1 + distances[0][i]))

        results.append({
            "name": worker["name"],
            "skill": worker["skill"],
            "location": worker["location"],
            "rating": worker["rating"],
            "description": worker["description"],
            "score": round(score, 3)
        })

    return results

# -------------------------
# TEST RUN
# -------------------------

if __name__ == "__main__":
    index, data, embeddings = build_index()

    query = "Need plumber for pipe leakage"
    results = search(query, index, data)

    for r in results:
        print(r)
        