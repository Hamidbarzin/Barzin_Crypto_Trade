# BarzinCrypto - Professional Crypto Trading Platform

A modern cryptocurrency trading platform with real-time price tracking, AI assistant, and beautiful UI.

## 🚀 Features

- **Real-time Crypto Prices** - Live price updates from CoinGecko API
- **AI Trading Assistant** - Get trading advice and market insights
- **Beautiful UI** - Modern, responsive design with galaxy background
- **Multi-language Support** - English and Persian (Farsi)
- **Trading Terminal** - Professional trading interface
- **News Feed** - Latest crypto news and updates
- **Educational Content** - Learn about crypto trading

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Lucide Icons
- Lightweight Charts
- Swiper

### Backend
- Flask (Python)
- Flask-CORS
- Flask-SQLAlchemy
- Gunicorn

## 📦 Installation

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
pip install -r requirements.txt
python app.py
```

## 🌐 Deployment

### Option 1: Separate Deployment (Recommended)

#### Backend on Render
1. Create new Web Service on Render
2. Connect GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**:
     - `COINGECKO_API_KEY`: CG-qyvm6UNyfsbBg5kSVLyy6bKS
     - `SESSION_SECRET`: your-secret-key
     - `DATABASE_URL`: sqlite:///app.db

#### Frontend on Vercel
1. Import project to Vercel
2. Framework: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Update `vercel.json` with your backend URL

### Option 2: All-in-One on Render
- Deploy as Web Service from root directory
- Serves both API and static files

## 🔑 Environment Variables

Create a `.env` file:
```
COINGECKO_API_KEY=your_api_key_here
SESSION_SECRET=your_secret_key_here
DATABASE_URL=sqlite:///app.db
```

## 📝 License

MIT License

## 👨‍💻 Author

Hamid Barzin
