import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os

# Create models directory if it doesn't exist
if not os.path.exists('models'):
    os.makedirs('models')

# --- 1. Train Crop Recommendation Model ---
def train_crop_model():
    df = pd.read_csv('Crop_data.csv')
    # Use the exact casing from your header: 'pH' 
    X = df[['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall']]
    y = df['label']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    
    pickle.dump(model, open('models/crop_recommendation.pkl', 'wb'))
    print("✅ Crop Model Trained (using pH column)")

# --- 2. Train Fertilizer Recommendation Model ---
def train_fertilizer_model():
    df = pd.read_csv('Fertilizer_data.csv')
    
    # Strip spaces to prevent hidden errors
    df.columns = df.columns.str.strip()
    
    # Label Encoding for categorical text
    le_soil = LabelEncoder()
    df['Soil Type'] = le_soil.fit_transform(df['Soil Type'])
    
    le_crop = LabelEncoder()
    df['Crop Type'] = le_crop.fit_transform(df['Crop Type'])
    
    # Matching your specific header: 'Temp', 'Humidity', 'Soil Moisture', 'N', 'K', 'P'
    # Make sure 'Soil Moisture' has the exact space as in your CSV
    try:
        X = df[['Temp', 'Humidity', 'Soil Moisture', 'Soil Type', 'Crop Type', 'N', 'K', 'P']]
        y = df['Fertilizer Name']
    except KeyError as e:
        print(f"Current Fertilizer Columns: {df.columns.tolist()}")
        raise e
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100) #
    model.fit(X_train, y_train)
    
    # Save the model and the encoders
    pickle.dump(model, open('models/fertilizer_recommendation.pkl', 'wb'))
    pickle.dump(le_soil, open('models/le_soil.pkl', 'wb'))
    pickle.dump(le_crop, open('models/le_crop.pkl', 'wb'))
    print("✅ Fertilizer Model Trained Successfully!")

if __name__ == "__main__":
    try:
        train_crop_model()
        train_fertilizer_model()
    except KeyError as e:
        print(f"❌ Column Name Error: {e}")
        print("Double check your CSV headers for spelling/casing!")