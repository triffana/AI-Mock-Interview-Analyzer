import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return "AI Interview Analyzer Running"

@app.route('/predict')
def predict():

    eye_contact = random.randint(70,95)
    speech_clarity = random.randint(70,95)
    voice_confidence = random.randint(70,95)

    confidence = round(
        (eye_contact +
         speech_clarity +
         voice_confidence) / 3
    )

    if confidence >= 85:
        stress = "Low"
    elif confidence >= 75:
        stress = "Medium"
    else:
        stress = "High"

    return jsonify({
        "confidence": confidence,
        "eye_contact": eye_contact,
        "speech_clarity": speech_clarity,
        "stress_level": stress,
        "voice_confidence": voice_confidence
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)