from fastapi import APIRouter, UploadFile, File, Form
from backend.db import cursor, conn
from ml.worker_model import detect_intent
import whisper
import tempfile
import os

router = APIRouter()

print("Loading Whisper model (this may take a moment)...")
whisper_model = whisper.load_model("base")

def process_command_logic(worker_id: int, text: str):
    intent, confidence = detect_intent(text)

    if intent == "set_available":
        cursor.execute("UPDATE workers SET status='available' WHERE id=?", (worker_id,))
        conn.commit()
        return {"intent": intent, "text": text, "response": "You are now available"}

    elif intent == "set_busy":
        cursor.execute("UPDATE workers SET status='busy' WHERE id=?", (worker_id,))
        conn.commit()
        return {"intent": intent, "text": text, "response": "You are now busy"}

    elif intent == "show_jobs":
        jobs = cursor.execute(
            "SELECT * FROM jobs WHERE worker_id=? AND status='assigned'",
            (worker_id,)
        ).fetchall()
        return {"intent": intent, "text": text, "jobs": [dict(j) for j in jobs], "response": "Showing your assigned jobs"}

    elif intent == "complete_job":
        cursor.execute(
            "UPDATE jobs SET status='completed' WHERE worker_id=? AND status='assigned'",
            (worker_id,)
        )
        conn.commit()
        return {"intent": intent, "text": text, "response": "Job completed"}

    elif intent == "accept_job":
        return {"intent": intent, "text": text, "response": "Navigating to jobs to accept"}

    elif intent == "reject_job":
        return {"intent": intent, "text": text, "response": "Navigating to jobs to reject"}

    return {"intent": "unknown", "text": text, "response": "Didn't understand"}


@router.post("/worker/command")
def worker_command(data: dict):
    return process_command_logic(data.get("worker_id"), data.get("text"))


@router.post("/worker/audio-command")
async def audio_command(worker_id: int = Form(...), file: UploadFile = File(...)):
    print("\n🎙️  Received audio request! The Whisper model is now processing the speech...")
    # Save the uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_path = temp_file.name

    try:
        # Transcribe using Whisper
        result = whisper_model.transcribe(temp_path)
        text = result["text"].strip()
        print(f"✅ Whisper heard: \"{text}\"")
        print(f"🧠 Passing to ML Intent Analyzer...\n")
    finally:
        os.remove(temp_path)

    # Process the transcribed text as a command
    return process_command_logic(worker_id, text)