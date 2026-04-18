import whisper
import sounddevice as sd
from scipy.io.wavfile import write
import requests
import numpy as np

# -------------------------
# CONFIG
# -------------------------

DURATION = 6
BACKEND_URL = "http://127.0.0.1:8000/worker/command"
WORKER_ID = 1

# 👉 CHANGE THIS IF NEEDED
DEVICE_ID = 15  # Bluetooth headset mic
# fallback: 1 (Realtek mic)

# -------------------------
# SHOW DEVICES
# -------------------------

print("\n🎧 Available Audio Devices:\n")
print(sd.query_devices())

# -------------------------
# LOAD WHISPER
# -------------------------

print("\nLoading Whisper...")
model = whisper.load_model("base")  # faster for CPU
print("Whisper ready!\n")

# -------------------------
# RECORD AUDIO (AUTO SAMPLE RATE)
# -------------------------

def record_audio():
    print("\n🎤 Speak now...")

    device_info = sd.query_devices(DEVICE_ID, 'input')
    samplerate = int(device_info['default_samplerate'])

    print(f"🎯 Using sample rate: {samplerate}")

    audio = sd.rec(
        int(DURATION * samplerate),
        samplerate=samplerate,
        channels=1,
        device=DEVICE_ID
    )

    sd.wait()

    # process audio
    audio = np.squeeze(audio)
    audio = audio * 2  # amplify

    print(f"🔊 Audio max amplitude: {np.max(np.abs(audio))}")

    write("input.wav", samplerate, audio)
    print("✅ Recorded")

# -------------------------
# TRANSCRIBE
# -------------------------

def transcribe():
    try:
        result = model.transcribe("input.wav", task="translate")
        text = result["text"].strip()

        print(f"\n📝 Raw transcription: '{text}'")

        return text

    except Exception as e:
        print("❌ Whisper error:", e)
        return ""

# -------------------------
# SEND TO BACKEND
# -------------------------

def send_to_backend(text):
    try:
        response = requests.post(
            BACKEND_URL,
            json={
                "worker_id": WORKER_ID,
                "text": text
            }
        )

        print("🤖 Backend response:", response.json())

    except Exception as e:
        print("❌ Backend error:", e)

# -------------------------
# MAIN LOOP
# -------------------------

while True:
    try:
        input("\nPress Enter to speak...")

        record_audio()
        text = transcribe()

        if text:
            send_to_backend(text)
        else:
            print("❌ No speech detected")

    except KeyboardInterrupt:
        print("\nExiting...")
        break