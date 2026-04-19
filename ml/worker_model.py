# ml/worker_intent.py

import numpy as np
from sentence_transformers import SentenceTransformer

# Load SAME model
model = SentenceTransformer('all-MiniLM-L6-v2')

# -------------------------
# DEFINE INTENTS
# -------------------------

intents = {
    "set_available": [
        "I am available",
        "I am free now",
        "I'm free",
        "I can take work",
        "assign me something",
        "give me a job",
        "I'm ready to work",
        "you can assign me tasks",
        "I'm not busy anymore",
        "I'm open for work",
        "put me on a job",
        "any work for me",
        "I'm good to take tasks",
        "I can start now",
        "ready for duty",
        "I'm idle right now",
        "no work currently, I can take some",
        "I'm done resting, give me work",
        "I am online and available",
        "you can send jobs to me"
    ],

    "set_busy": [
        "I am busy",
        "I am occupied",
        "I can't work now",
        "not available",
        "I have work already",
        "I'm in the middle of something",
        "don't assign me anything",
        "I can't take jobs now",
        "I am not free",
        "I have other tasks",
        "skip me for now",
        "I'm working on something else",
        "currently unavailable",
        "I’m engaged right now",
        "I can’t do any work currently",
        "not taking jobs at the moment",
        "pause my availability",
        "I am offline",
        "don’t send work",
        "busy right now"
    ],

    "complete_job": [
        "I completed the job",
        "task is done",
        "job finished",
        "I finished my work",
        "it's completed",
        "done with the task",
        "I have completed it",
        "work is done",
        "task completed successfully",
        "I wrapped it up",
        "that job is done",
        "finished the assignment",
        "job has been completed",
        "I’m done with it",
        "completed successfully",
        "all done",
        "work done",
        "I have finished everything",
        "task over",
        "completed my job"
    ],

    "show_jobs": [
        "show my jobs",
        "what are my tasks",
        "list my jobs",
        "do I have any work",
        "show current jobs",
        "what work do I have",
        "any pending jobs",
        "what are my assignments",
        "tell me my jobs",
        "what tasks are assigned to me",
        "show my work",
        "display my tasks",
        "do I have anything to do",
        "what's on my plate",
        "any jobs for me",
        "what am I working on",
        "give me my job list",
        "show pending work",
        "my current work",
        "list all my tasks"
    ],

    "accept_job": [
        "I accept the job",
        "I'll take it",
        "assign it to me",
        "I can do this",
        "I'll handle it",
        "yes I can take it",
        "give me this job",
        "I'm taking this task",
        "I agree to do it",
        "I'll work on it",
        "I want this job",
        "consider it accepted",
        "okay I'll do it",
        "I'll pick this up",
        "I'm accepting this",
        "yes assign me",
        "I’ll take responsibility",
        "I'm good with this job",
        "I'll do this work",
        "accepting the task"
    ],

    "reject_job": [
        "I reject this job",
        "I can't take this",
        "not interested",
        "give it to someone else",
        "I won't do this",
        "I cannot accept this job",
        "skip this task",
        "not my job",
        "I don't want this",
        "please reassign",
        "I’m declining this",
        "I can't handle this",
        "not possible for me",
        "I refuse this job",
        "pass this task",
        "I won't take it",
        "not doing this",
        "assign to someone else",
        "I can't work on this",
        "rejecting the task"
    ]
}

intent_texts = []
intent_map = []

for intent, examples in intents.items():
    for ex in examples:
        intent_texts.append(ex)
        intent_map.append(intent)

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

    intent = intent_map[best_idx]

    return intent, float(confidence)

    # -------------------------
# TEST RUN
# ------------------------- 

if __name__ == "__main__":
    test_sentences = [
        "I am free now  ",
        "I finished the job",
        "I can take work today",
        "show my work",
        "I am busy right now"
    ]

    for text in test_sentences:
        intent, confidence = detect_intent(text)
        print(f"\nInput: {text}")
        print(f"Intent: {intent}")
        print(f"Confidence: {round(confidence, 3)}")