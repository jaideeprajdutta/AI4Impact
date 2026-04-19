const BASE_URL = "http://127.0.0.1:8000";

// -------------------------
// LIST WORKERS
// -------------------------
export async function getWorkers() {
    const res = await fetch(`${BASE_URL}/workers`);
    return res.json();
}

// -------------------------
// GET SINGLE JOB
// -------------------------
export async function getJob(jobId) {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`);
    return res.json();
}

// -------------------------
// RECOMMEND WORKERS
// -------------------------
export async function getRecommendations(query) {
    const res = await fetch(`${BASE_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    return res.json();
}

// -------------------------
// CREATE JOB
// -------------------------
export async function createJob(data) {
    const res = await fetch(`${BASE_URL}/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.json();
}

// -------------------------
// GET WORKER JOBS
// -------------------------
export async function getWorkerJobs(workerId) {
    const res = await fetch(`${BASE_URL}/jobs/available/${workerId}`);
    return res.json();
}

// -------------------------
// ACCEPT JOB
// -------------------------
export async function acceptJob(worker_id, job_id) {
    const res = await fetch(`${BASE_URL}/jobs/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worker_id, job_id }),
    });

    return res.json();
}

// -------------------------
// VOICE COMMAND
// -------------------------
export async function sendVoiceCommand(worker_id, text) {
    const res = await fetch(`${BASE_URL}/worker/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worker_id, text }),
    });

    return res.json();
}

// -------------------------
// AUDIO VOICE COMMAND (Whisper)
// -------------------------
export async function sendAudioCommand(worker_id, audioBlob) {
    const formData = new FormData();
    formData.append("worker_id", worker_id);
    formData.append("file", audioBlob, "recording.webm");

    const res = await fetch(`${BASE_URL}/worker/audio-command`, {
        method: "POST",
        body: formData, // No hardcoded Content-Type header needed for FormData; fetch sets it with boundary
    });

    return res.json();
}