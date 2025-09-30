# BarzinCrypto Backend API

Flask backend for BarzinCrypto trading platform.

## Deployment on Render

1. Create new Web Service
2. Connect to GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**:
     ```
     COINGECKO_API_KEY=CG-qyvm6UNyfsbBg5kSVLyy6bKS
     SESSION_SECRET=your-secret-key
     DATABASE_URL=sqlite:///app.db
     ```

## Local Development

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Server runs on http://localhost:8000
