import os
from flask import Flask, request, jsonify, session, send_file, send_from_directory
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__, static_folder='public', static_url_path='')
app.secret_key = os.environ.get("SESSION_SECRET", "super-secret-key-for-development-only-2024")

# CORS configuration for session cookies
CORS(app, supports_credentials=True, origins=["*"])

# Session configuration
app.config['SESSION_COOKIE_SECURE'] = False  # For development
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Database disabled for now to avoid psycopg2 dependency issues
# We'll use in-memory storage instead
db = None

# React App Routes - Main application
@app.route('/')
def index():
    return send_file('dist/index.html')

@app.route('/<path:filename>')  
def react_static(filename):
    # Handle React Router paths
    if '.' not in filename:
        return send_file('dist/index.html')
    return send_from_directory('dist', filename)

@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory('dist/assets', filename)

# News page routes
@app.route("/news")
@app.route("/news/")
def news_page():
    return send_from_directory(app.static_folder, "news-inline.html")

@app.route("/news.json")
def news_json():
    return send_from_directory(app.static_folder, "news.json")

# AI Assistant page route
@app.route("/ai")
@app.route("/ai/")
def ai_page():
    return send_file('dist/index.html')

# Auction page route  
@app.route("/auction")
@app.route("/auction/")
def auction_page():
    return send_file('dist/index.html')

# VPN page route
@app.route("/vpn")
@app.route("/vpn/")
def vpn_page():
    return send_file('dist/index.html')

# Terminal page route
@app.route("/terminal")
@app.route("/terminal/")
def terminal_page():
    return send_file('dist/index.html')

# Education page route
@app.route("/education")
@app.route("/education/")
def education_page():
    return send_file('dist/index.html')

# Auth pages routes
@app.route("/auth/signin")
@app.route("/auth/signin/")
def signin_page():
    return send_file('dist/index.html')

@app.route("/auth/signup")
@app.route("/auth/signup/")
def signup_page():
    return send_file('dist/index.html')

# API Routes for React app
@app.route('/api/set-language/<lang>')
def set_language(lang):
    print(f"Setting language to: {lang}")  # Debug log
    if lang.lower() in ['en', 'fa']:  # Accept both cases
        session['language'] = lang.lower()
        session.permanent = True  # Make session permanent
        print(f"Language saved in session: {session.get('language')}")  # Debug log
        return jsonify({'status': 'success', 'language': session['language']})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid language'}), 400

@app.route('/api/get-language')
def get_language():
    current_lang = session.get('language', 'en')  # Default to English
    print(f"Retrieved language from session: {current_lang}")  # Debug log
    return jsonify({'language': current_lang})

# API routes
@app.route('/api/ask-ai', methods=['POST'])
def ask_ai():
    question = request.json.get('question', '') if request.is_json else ''
    
    # Simple AI responses in Persian
    responses = {
        'trade': 'For crypto trading, start with technical analysis learning. Begin with small amounts and use stop loss.',
        'bitcoin': 'Bitcoin is the first and most popular cryptocurrency. Its price is determined by supply and demand.',
        'ethereum': 'Ethereum is a platform for smart contracts. In addition to ETH, it is the foundation of many DeFi and NFT projects.',
        'default': 'Interesting question! For a more accurate answer, please ask your question more clearly. I can help you with cryptocurrency trading, technical analysis and project introduction.'
    }
    
    # Simple keyword matching
    response = responses['default']
    question_lower = question.lower()
    
    if 'trade' in question_lower or 'trading' in question_lower:
        response = responses['trade']
    elif 'bitcoin' in question_lower or 'btc' in question_lower:
        response = responses['bitcoin'] 
    elif 'ethereum' in question_lower or 'eth' in question_lower:
        response = responses['ethereum']
    
    return jsonify({'response': response})

# Place Order API
@app.route('/api/place-order', methods=['POST'])
def place_order():
    """Place a trading order"""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Mock order placement
        order = {
            'id': len(orders) + 1,
            'symbol': data.get('symbol', 'BTC/USDT'),
            'side': data.get('side', 'BUY'),
            'type': data.get('type', 'MARKET'),
            'amount': data.get('amount', 0),
            'price': data.get('price', 0),
            'status': 'PENDING',
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # In a real app, save to database
        orders.append(order)
        
        return jsonify({
            'success': True,
            'order': order,
            'message': 'Order placed successfully'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Subscribe API
@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    """Subscribe to newsletter"""
    try:
        data = request.json
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Mock subscription
        print(f"New subscription: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Successfully subscribed to newsletter'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Auth APIs
@app.route('/api/auth/signin', methods=['POST'])
def api_signin():
    """Sign in user"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Mock authentication
        if email == 'demo@barzincrypto.com' and password == 'demo123':
            return jsonify({
                'success': True,
                'user': {
                    'id': 1,
                    'email': email,
                    'name': 'Demo User'
                },
                'token': 'mock-jwt-token'
            })
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/signup', methods=['POST'])
def api_signup():
    """Sign up user"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        fullName = data.get('fullName')
        
        if not email or not password or not fullName:
            return jsonify({'error': 'All fields are required'}), 400
        
        # Mock user creation
        user = {
            'id': len(users) + 1,
            'email': email,
            'name': fullName,
            'created_at': datetime.utcnow().isoformat()
        }
        
        users.append(user)
        
        return jsonify({
            'success': True,
            'user': user,
            'message': 'Account created successfully'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Mock data storage
orders = []
users = []

@app.route('/api/crypto-prices')
def get_crypto_prices():
    """Get real-time cryptocurrency prices from CoinGecko API"""
    import requests
    
    try:
        # CoinGecko API with pro API key for higher rate limits
        url = "https://api.coingecko.com/api/v3/simple/price"
        headers = {
            'x-cg-demo-api-key': '881ba5a9f027338c265eff2d481b899ab62cd76a28f343537c5589299527a0de'
        }
        params = {
            'ids': 'bitcoin,ethereum,binancecoin,cardano,solana,polkadot,avalanche-2,matic-network,chainlink,cosmos,litecoin,uniswap,ripple',
            'vs_currencies': 'usd',
            'include_24hr_change': 'true',
            'include_market_cap': 'true',
            'include_24hr_vol': 'true'
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            # Format data for our frontend
            formatted_data = {}
            crypto_mapping = {
                'bitcoin': 'BTC',
                'ethereum': 'ETH', 
                'binancecoin': 'BNB',
                'cardano': 'ADA',
                'solana': 'SOL',
                'polkadot': 'DOT',
                'avalanche-2': 'AVAX',
                'matic-network': 'MATIC',
                'chainlink': 'LINK',
                'cosmos': 'ATOM',
                'litecoin': 'LTC',
                'uniswap': 'UNI',
                'ripple': 'XRP'
            }
            
            for coin_id, symbol in crypto_mapping.items():
                if coin_id in data:
                    formatted_data[symbol] = {
                        'price': data[coin_id]['usd'],
                        'change_24h': data[coin_id].get('usd_24h_change', 0),
                        'market_cap': data[coin_id].get('usd_market_cap', 0),
                        'volume_24h': data[coin_id].get('usd_24h_vol', 0)
                    }
            
            return jsonify(formatted_data)
        else:
            # Fallback to mock data if API fails
            return jsonify(get_mock_prices())
            
    except Exception as e:
        print(f"Error fetching crypto prices: {e}")
        # Return mock data if API fails
        return jsonify(get_mock_prices())

def get_mock_prices():
    """Fallback mock prices if real API fails"""
    import random
    
    base_prices = {
        'BTC': 97234.56,
        'ETH': 3456.78,
        'BNB': 312.45,
        'ADA': 0.54,
        'SOL': 245.67,
        'DOT': 8.92,
        'AVAX': 45.23,
        'MATIC': 1.23
    }
    
    mock_data = {}
    for symbol, base_price in base_prices.items():
        # Add some random variation
        variation = random.uniform(-0.05, 0.05)  # ±5% variation
        current_price = base_price * (1 + variation)
        change_24h = random.uniform(-10, 10)  # Random 24h change
        
        mock_data[symbol] = {
            'price': current_price,
            'change_24h': change_24h,
            'market_cap': current_price * random.randint(10000000, 20000000),
            'volume_24h': current_price * random.randint(1000000, 5000000)
        }
    
    return mock_data

# Database initialization disabled - using in-memory storage
print("📱 Running without database (using in-memory storage)")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)