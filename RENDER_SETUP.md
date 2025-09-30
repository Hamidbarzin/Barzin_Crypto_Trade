# راهنمای Deploy در Render

## تنظیمات Render Dashboard

### 1. General Settings
- **Name**: `barzincrypto`
- **Region**: Oregon (US West)
- **Branch**: `main`

### 2. Build & Deploy Settings

#### Root Directory
```
(خالی بگذارید - یا حذف کنید)
```

#### Build Command
```bash
pip install -r requirements.txt && npm install && npm run build
```

#### Start Command
```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

### 3. Environment Variables

| Key | Value |
|-----|-------|
| `COINGECKO_API_KEY` | `CG-qyvm6UNyfsbBg5kSVLyy6bKS` |
| `SESSION_SECRET` | (Auto-generate) |
| `DATABASE_URL` | `sqlite:///app.db` |
| `PYTHON_VERSION` | `3.11.0` |
| `NODE_VERSION` | `18.17.0` |

---

## مراحل Deploy

1. **پاک کردن Root Directory**:
   - Settings → Build & Deploy
   - Root Directory را خالی کنید یا حذف کنید
   - Save Changes

2. **Manual Deploy**:
   - برگردید به صفحه اصلی سرویس
   - دکمه "Manual Deploy" → "Deploy latest commit"

3. **چک کردن Logs**:
   - منتظر بمانید تا build تمام شود
   - اگر خطا داشت، لاگ‌ها را بررسی کنید

---

## ساختار پروژه

```
BarzinCrypto/
├── app.py              # Flask backend (اصلی)
├── requirements.txt    # Python dependencies
├── package.json        # Node dependencies
├── dist/               # Built React app (بعد از build)
├── src/                # React source files
└── render.yaml         # Render config
```

---

## Troubleshooting

### خطا: "Service Root Directory is missing"
✅ **راه‌حل**: Root Directory را در تنظیمات Render خالی کنید

### خطا: "npm: command not found"
✅ **راه‌حل**: مطمئن شوید `NODE_VERSION` در Environment Variables تنظیم شده

### خطا: "No such file or directory: dist/index.html"
✅ **راه‌حل**: مطمئن شوید `npm run build` در Build Command اجرا شده

---

## URLs

- **Production**: https://barzin-crypto-trade.onrender.com
- **API Health**: https://barzin-crypto-trade.onrender.com/api/crypto-prices
- **GitHub**: https://github.com/Hamidbarzin/Barzin_Crypto_Trade
