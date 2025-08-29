# Futuristic Journal

A sleek, anime-flavored personal tracking app built with **React + Vite + TypeScript + Tailwind + Three.js**.
Includes a **Python script** to export your daily records to a `.txt` file.

## Quick Start (Windows 11)

### 1) Install Node + Python
- Node.js 18+ and Python 3.10+

### 2) Install frontend deps
```bash
cd frontend
npm i
npm run dev
```

### 3) Use the app
- Add entries for **Expenses, Workouts, Learning, Interviews, Quotes**.
- Click **Export → JSON** to download your `records.json`. Move it to the `/data` folder at project root.
- Click **Export → Today (.txt)** to download the daily text directly from the app.

### 4) Python export (optional / automated)
- Ensure `/data/records.json` exists (export from app and move it here).
- Run:
```bash
python scripts/export_today.py
```
- Output will be placed in `/exports/today_YYYY-MM-DD.txt`

## Notes
- Data is stored in **localStorage** for instant use.
- The app can **export/import JSON** for backups.
- Three.js background is powered by **@react-three/fiber** + **drei**.
