# Calisfy AI — Calisthenics Training Platform
Tagline: **Train. Master. Progress.**

## 1. Run Locally

### Frontend (Next.js + React + Tailwind CSS + Recharts)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (FastAPI + PostgreSQL + SQLAlchemy + Argon2)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Calisfy AI platform"
git branch -M main
git remote add origin https://github.com/<your-username>/calisfy-ai.git
git push -u origin main
```
