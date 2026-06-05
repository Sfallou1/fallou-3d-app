from flask import Flask, render_template, jsonify
import socket, datetime, random

app = Flask(__name__)

PASSIONS = [
    {"name": "DevOps", "icon": "🚀", "color": "#ff6b6b", "description": "CI/CD, Automatisation", "technologies": ["Docker","K8s","Jenkins"]},
    {"name": "Cloud", "icon": "☁️", "color": "#4ecdc4", "description": "AWS, GCP", "technologies": ["EC2","S3","Lambda"]},
    {"name": "3D", "icon": "🎨", "color": "#45b7d1", "description": "Three.js", "technologies": ["Three.js","WebGL"]},
    {"name": "Open Source", "icon": "🌍", "color": "#96ceb4", "description": "Contributions", "technologies": ["GitHub","GitLab"]},
    {"name": "Innovation", "icon": "💡", "color": "#ffeaa7", "description": "R&D", "technologies": ["AI","IoT"]}
]

@app.route('/')
def index():
    return render_template('index.html', name="Fallou", passions=PASSIONS, hostname=socket.gethostname())

@app.route('/api/random-quote')
def random_quote():
    quotes = ["Le code est poésie ✨", "L'automatisation libère 🚀", "Kubernetes c'est magique 🎯"]
    return jsonify({"quote": random.choice(quotes)})

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
