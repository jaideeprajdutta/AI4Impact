# 🇮🇳 BharatPro

> A next-generation AI platform connecting users with verified local professionals across India in minutes.

BharatPro is an intelligently designed full-stack application that leverages local machine learning models to provide semantic search matching and hands-free voice AI for blue-collar workers.

## ✨ Key Features

* **🧠 Semantic AI Search:** We've abandoned standard keyword searches. By utilizing `Sentence-Transformers`, customer queries (like _"I need someone to fix my pipes"_) are encoded into embeddings and mathematically matched against thousands of worker profiles (skill, location, rating) instantly.
* **🎙️ Hands-Free Worker Voice AI:** The worker dashboard features a fully functional `MediaRecorder` module that captures audio natively in the browser. It passes `.webm` raw audio to the backend where **OpenAI's Whisper** model converts speech to text, which is then mapped mathematically to system intents (e.g. changing status, viewing jobs).
* **🎨 Modern Glassmorphism UI:** Built exclusively with Tailwind CSS to offer a breathtaking, fully responsive user experience. Custom tokens, high-contrast layouts, micro-animations, and subtle backdrop-filters.
* **⚡ Blazing Fast Architecture:** Driven by a lightweight FastAPI server interacting with an optimized SQLite embedded database allowing the UI to react instantly.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Custom Design System)
* React Router (`react-router-dom`)
* Native MediaRecorder Web API

**Backend:**
* Python & FastAPI (`uvicorn`)
* SQLite 3

**Machine Learning (AI):**
* `openai-whisper` (Base model for Speech-to-Text inference)
* `sentence-transformers` (`all-MiniLM-L6-v2` for Vector/Cosine Similarity)
* `numpy` (For rapid vector sorting)

---

## 🚀 Getting Started (Local Development)

Because this app utilizes isolated environments for UI design and heavy AI inferencing, the Frontend and Backend must be run securely on different ports.

### 1. Database Initialization
Ensure that the local SQLite database is populated with the simulated workers:
```bash
cd backend
python -c "from db import load_workers_from_json; load_workers_from_json()"
```

### 2. Start the FastAPI Backend (Port 8000)
```bash
# This will install FastAPI, Uvicorn, Whisper, and PyTorch.
# NOTE: It is recommended to install PyTorch CPU version to save disk space if not using a GPU.
pip install -r requirements.txt

# Run the server
python -m uvicorn backend.main:app --reload
```
*(Note: On the very first run, Uvicorn will temporarily pause to download the 145MB Whisper base model and the MiniLM-L6 transformers model).*

### 3. Start the React Frontend (Port 5173)
Open a new, separate terminal tab:
```bash
cd bharatpro-app

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 🎯 Navigating the App
* **Customer Journey:** Go to `http://localhost:5173/`, search for a profession, use the dynamic Book Now modal, and track your worker on the beautiful dynamic tracking screen.
* **Worker Journey:** Go to `http://localhost:5173/worker/dashboard`, simulate a specific worker using the dropdown, accept incoming jobs, and test the Microphone button to verbally command the system!

---
*Built for the AI4Impact Hackathon / Project Showcase.*
