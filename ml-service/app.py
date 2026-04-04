from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

# ✅ Get base directory (important for Render)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ✅ Load models safely
crop_model = None
fert_model = None

try:
    crop_model = pickle.load(open(os.path.join(BASE_DIR, 'models/crop_recommendation.pkl'), 'rb'))
    fert_model = pickle.load(open(os.path.join(BASE_DIR, 'models/fertilizer_recommendation.pkl'), 'rb'))
    print("✅ Models loaded successfully")
except Exception as e:
    print("❌ Model loading error:", e)


# ✅ Home Route (important for Render health check)
@app.route("/")
def home():
    return "Bhumi ML API is running 🚀"


# ✅ Crop Prediction API
@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    if crop_model is None:
        return jsonify({"error": "Crop model not loaded"}), 500

    try:
        data = request.get_json()

        features = np.array([[
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['pH']),
            float(data['rainfall'])
        ]])

        prediction = crop_model.predict(features)

        return jsonify({
            'recommended_crop': str(prediction[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ Fertilizer Prediction API
@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    if fert_model is None:
        return jsonify({"error": "Fertilizer model not loaded"}), 500

    try:
        data = request.get_json()

        features = pd.DataFrame([{
    'N': float(data['nitrogen']),
    'P': float(data['phosphorus']),
    'K': float(data['potassium']),
    'temperature': float(data['temperature']),
    'humidity': float(data['humidity']),
    'ph': float(data['pH']),
    'rainfall': float(data['rainfall'])
   }])

        prediction = fert_model.predict(features)

        return jsonify({
            'recommended_fertilizer': str(prediction[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)