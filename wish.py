from flask import Flask, render_template
import os

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/messages')
def get_messages():
    """API endpoint to get birthday messages"""
    messages = [
        "Happy Birthday to my most beautiful girl! 🌹",
        "Every moment with you is a precious gift. Wishing you endless joy! 💝",
        "Your smile brightens my darkest days. Happy Birthday my love! ✨",
        "I love you more than words could ever express. Have the most magical birthday! 🎂",
        "Thank you for being the most wonderful person in my life. Happy Birthday! 💕",
        "You deserve all the happiness in the world today and always! 🌸",
        "My heart belongs to you, today and forever. Happy Birthday! 💗"
    ]
    return {'messages': messages}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'
    debug = os.environ.get('FLASK_DEBUG', '0') == '1'
    print(f"🎂 Birthday Website is running at http://{host}:{port}")
    app.run(debug=debug, host=host, port=port)
