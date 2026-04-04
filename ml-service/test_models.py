import pickle
import numpy as np

# Load the models and encoders [cite: 48, 149]
crop_model = pickle.load(open('models/crop_recommendation.pkl', 'rb'))
fert_model = pickle.load(open('models/fertilizer_recommendation.pkl', 'rb'))
le_soil = pickle.load(open('models/le_soil.pkl', 'rb'))
le_crop = pickle.load(open('models/le_crop.pkl', 'rb'))

def test_crop():
    # Example input: N, P, K, Temp, Humidity, pH, Rainfall [cite: 96, 214]
    sample_data = np.array([[90, 42, 43, 20.8, 82.0, 6.5, 202.9]])
    prediction = crop_model.predict(sample_data)
    print(f"🌾 Predicted Crop: {prediction[0]}")

def test_fertilizer():
    # First, encode text inputs to numbers using the saved encoders [cite: 48, 107]
    soil_type = le_soil.transform(['Loamy'])[0]
    crop_type = le_crop.transform(['Rice'])[0]
    
    # Example input: Temp, Humidity, Moisture, Soil Type, Crop Type, N, K, P [cite: 107, 219]
    sample_data = np.array([[26, 52, 38, soil_type, crop_type, 37, 0, 0]])
    prediction = fert_model.predict(sample_data)
    print(f"🧪 Predicted Fertilizer: {prediction[0]}")

if __name__ == "__main__":
    print("--- Testing Bhumi ML Models ---")
    test_crop()
    test_fertilizer()