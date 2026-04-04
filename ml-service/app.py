from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app) # Allows your Express server to talk to Flask [cite: 79]

# Load models (Assuming you have trained and saved them as .pkl files) [cite: 48, 149]
try:
    crop_model = pickle.load(open('models/crop_recommendation.pkl', 'rb'))
    fert_model = pickle.load(open('models/fertilizer_recommendation.pkl', 'rb'))
except FileNotFoundError:
    print("Warning: Model files not found. Please run training script first.")

@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    """
    Inputs: N, P, K, temperature, humidity, pH, rainfall [cite: 96, 214]
    """
    data = request.get_json()
    
    # Extract features in the correct order for the model [cite: 48]
    features = np.array([[
        data['nitrogen'], data['phosphorus'], data['potassium'],
        data['temperature'], data['humidity'], data['pH'], data['rainfall']
    ]])
    
    prediction = crop_model.predict(features)
    return jsonify({'recommended_crop': prediction[0]})

@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    """
    Inputs: Soil Type, Crop Type, N, P, K, etc. [cite: 107, 219]
    """
    data = request.get_json()
    
    # Features must match your training data columns [cite: 48]
    features = np.array([[
        data['temp'], data['humidity'], data['moisture'], 
        data['soil_type'], data['crop_type'], 
        data['nitrogen'], data['potassium'], data['phosphorus']
    ]])
    
    prediction = fert_model.predict(features)
    return jsonify({'recommended_fertilizer': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000, debug=True)