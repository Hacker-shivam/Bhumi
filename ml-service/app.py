from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

# ✅ Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

print("📁 BASE_DIR:", BASE_DIR)

# ✅ Debug folders
try:
    print("📁 Files:", os.listdir(BASE_DIR))
    print("📁 Models:", os.listdir(os.path.join(BASE_DIR, 'models')))
except Exception as e:
    print("❌ Folder error:", e)

# ✅ Load models + encoders
crop_model = None
fert_model = None
le_soil = None
le_crop = None

try:
    crop_model = pickle.load(open(os.path.join(BASE_DIR, 'models/crop_recommendation.pkl'), 'rb'))
    fert_model = pickle.load(open(os.path.join(BASE_DIR, 'models/fertilizer_recommendation.pkl'), 'rb'))

    # 🔥 Load encoders
    le_soil = pickle.load(open(os.path.join(BASE_DIR, 'models/le_soil.pkl'), 'rb'))
    le_crop = pickle.load(open(os.path.join(BASE_DIR, 'models/le_crop.pkl'), 'rb'))

    print("✅ Models & encoders loaded successfully")

except Exception as e:
    print("❌ Model loading error:", e)


# ✅ Home route
@app.route("/")
def home():
    return "Bhumi ML API running 🚀"


# =========================================================
# 🌱 CROP PREDICTION
# =========================================================
@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    print("\n===== 🌱 CROP API CALLED =====")

    if crop_model is None:
        return jsonify({"error": "Crop model not loaded"}), 500

    try:
        data = request.get_json()
        print("📥 Incoming:", data)

        values = [
            float(data.get('nitrogen', 0)),
            float(data.get('phosphorus', 0)),
            float(data.get('potassium', 0)),
            float(data.get('temperature', 0)),
            float(data.get('humidity', 0)),
            float(data.get('pH') or data.get('ph') or 0),  # ✅ FIX
            float(data.get('rainfall', 0))
        ]

        # ✅ Correct feature names (IMPORTANT)
        df = pd.DataFrame([values], columns=[
            "N", "P", "K", "temperature", "humidity", "pH", "rainfall"
        ])

        print("📊 DataFrame:\n", df)

        prediction = crop_model.predict(df)

        print("✅ Prediction:", prediction)

        return jsonify({
            "recommended_crop": str(prediction[0])
        })

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 400


# =========================================================
# 🌾 FERTILIZER PREDICTION
# =========================================================
@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    print("\n===== 🌾 FERTILIZER API CALLED =====")

    if fert_model is None:
        return jsonify({"error": "Fertilizer model not loaded"}), 500

    try:
        data = request.get_json()
        print("📥 Incoming:", data)

        # 🔥 Handle frontend mismatch (VERY IMPORTANT)
        temp = data.get('temp') or data.get('temperature') or 0
        moisture = data.get('moisture') or data.get('soilMoisture') or 0
        soil_input = data.get('soil_type') or data.get('soilType')
        crop_input = data.get('crop_type') or data.get('cropType')

        # ✅ Map numeric → label (based on your dataset)
        soil_map = ['Clayey', 'Sandy', 'Loamy', 'Black', 'Red']
        crop_map = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Barley', 'Millets', 'Pulses']

        soil_label = soil_map[int(soil_input)] if soil_input is not None else 'Loamy'
        crop_label = crop_map[int(crop_input)] if crop_input is not None else 'Wheat'

        print("🌱 Soil Label:", soil_label)
        print("🌾 Crop Label:", crop_label)

        # 🔥 Encode categorical values
        encoded_soil = le_soil.transform([soil_label])[0]
        encoded_crop = le_crop.transform([crop_label])[0]

        # ✅ Final feature dict (NO pH here ❌)
        feature_dict = {
            'Temp': float(temp),
            'Humidity': float(data.get('humidity', 0)),
            'Soil Moisture': float(moisture),
            'Soil Type': encoded_soil,
            'Crop Type': encoded_crop,
            'N': float(data.get('nitrogen', 0)),
            'K': float(data.get('potassium', 0)),
            'P': float(data.get('phosphorus', 0))
        }

        print("🔢 Encoded Features:", feature_dict)

        df = pd.DataFrame([feature_dict])

        print("📊 DataFrame:\n", df)

        prediction = fert_model.predict(df)

        print("✅ Prediction:", prediction)

        return jsonify({
            "recommended_fertilizer": str(prediction[0])
        })

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 400


# =========================================================
# 🚀 RUN SERVER
# =========================================================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)