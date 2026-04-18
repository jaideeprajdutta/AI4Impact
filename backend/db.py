import sqlite3
import json
import os

DB_PATH = "workers.db"

conn = sqlite3.connect(DB_PATH, check_same_thread=False)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()


def init_db():
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS workers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        skill TEXT,
        location TEXT,
        rating REAL,
        status TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY,
        worker_id INTEGER,
        description TEXT,
        required_skill TEXT,
        location TEXT,
        status TEXT,
        price REAL
    )
    """)

    conn.commit()
def load_workers_from_json():
    import os
    import json

    file_path = os.path.join("data", "_large_workers_dataset.json")

    count = cursor.execute("SELECT COUNT(*) FROM workers").fetchone()[0]
    if count > 0:
        print("Workers already exist. Skipping load.")
        return

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    with open(file_path, "r") as f:
        workers = json.load(f)

    data = []

    for i, w in enumerate(workers):
        try:
            data.append((
                str(w.get("name", "unknown")),
                str(w.get("skill", "unknown")),
                str(w.get("location", "unknown")),
                float(w.get("rating", 4.0)),
                "available"
            ))
        except Exception as e:
            print(f"Skipping bad row {i}: {e}")

    cursor.executemany("""
        INSERT INTO workers (name, skill, location, rating, status)
        VALUES (?, ?, ?, ?, ?)
    """, data)

    conn.commit()
    print(f"✅ Loaded {len(data)} workers into DB!")


def optimize_db():
    cursor.execute("PRAGMA journal_mode=WAL;")
    cursor.execute("PRAGMA synchronous=NORMAL;")
    conn.commit()