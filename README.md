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

## 🌐 Deployment on Render

### Backend (Web Service)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Environment Variables**:
  - `COINGECKO_API_KEY`: Your CoinGecko API key
  - `DATABASE_URL`: PostgreSQL database URL (optional)
  - `SESSION_SECRET`: Random secret key

### Frontend (Static Site)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

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
