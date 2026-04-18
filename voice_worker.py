import whisper
import sounddevice as sd
from scipy.io.wavfile import write
import requests

# -------------------------
# CONFIG
# -------------------------

SAMPLE_RATE = 16000
DURATION = 5
BACKEND_URL = "http://127.0.0.1:8000/worker/command"
WORKER_ID = 1

# -------------------------
# LOAD MODEL
# -------------------------

print("Loading Whisper...")
model = whisper.load_model("base")  # use "tiny" if slow
print("Whisper ready!")

# -------------------------
# RECORD AUDIO
# -------------------------

def record_audio():
    print("\n🎤 Speak now...")
    audio = sd.rec(int(DURATION * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1)
    sd.wait()
    write("input.wav", SAMPLE_RATE, audio)
    print("✅ Recorded")

# -------------------------
# TRANSCRIBE + TRANSLATE
# -------------------------

def transcribe():
    result = model.transcribe("input.wav", task="translate")
    text = result["text"].strip()
    print(f"📝 You said: {text}")
    return text

# -------------------------
# SEND TO BACKEND
# -------------------------

def send_to_backend(text):
    response = requests.post(
        BACKEND_URL,
        json={
            "worker_id": WORKER_ID,
            "text": text
        }
    )

    print("🤖 Backend:", response.json())

# -------------------------
# MAIN LOOP
# -------------------------

while True:
    input("\nPress Enter to speak...")

    record_audio()
    text = transcribe()

    if text:
        send_to_backend(text)
    else:
        print("❌ No speech detected")