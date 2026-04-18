# ml/worker_intent.py

import numpy as np
from sentence_transformers import SentenceTransformer

# Load SAME model
model = SentenceTransformer('all-MiniLM-L6-v2')

# -------------------------
# DEFINE INTENTS
# -------------------------

intents = {
    "set_available": "I am available for work",
    "set_busy": "I am busy right now",
    "complete_job": "I have completed the job",
    "show_jobs": "Show my current jobs",
    "accept_job": "I accept this job",
    "reject_job": "I cannot take this job"
}

intent_keys = list(intents.keys())
intent_texts = list(intents.values())

# -------------------------
# EMBED INTENTS ONCE
# -------------------------

intent_embeddings = model.encode(intent_texts)
intent_embeddings = intent_embeddings / np.linalg.norm(intent_embeddings, axis=1, keepdims=True)


# -------------------------
# DETECT INTENT
# -------------------------

def detect_intent(user_text):
    query = model.encode([user_text])
    query = query / np.linalg.norm(query, axis=1, keepdims=True)

    similarities = np.dot(intent_embeddings, query.T).flatten()

    best_idx = similarities.argmax()
    confidence = similarities[best_idx]

    intent = intent_keys[best_idx]

    return intent, float(confidence)

    # -------------------------
# TEST RUN
# ------------------------- 

if __name__ == "__main__":
    test_sentences = [
        "I am free now  ",
        "I finished the job",
        "I can't take work today",
        "show my work",
        "I am busy right now"
    ]

    for text in test_sentences:
        intent, confidence = detect_intent(text)
        print(f"\nInput: {text}")
        print(f"Intent: {intent}")
        print(f"Confidence: {round(confidence, 3)}")