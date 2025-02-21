from flask import Flask, request, render_template
import librosa
import numpy as np
import tensorflow as tf


# ======================
# 1. Configuration
# ======================
MODEL_PATH = "C:\Ojas\Final-year-project\web\Lung disease classification web\lung_sound_model.keras"
CLASSES = ["COPD", "Bronchiolitis", "Pneumonia", "URTI", "Healthy"]
N_MFCC = 128
MAX_TIMESTEPS = 500  # Match the training pipeline

# ======================
# 2. Load Model
# ======================
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_audio(audio_path):
    """Preprocess audio for model prediction"""
    y, sr = librosa.load(audio_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=N_MFCC)
    
    if mfcc.shape[1] < MAX_TIMESTEPS:
        mfcc = np.pad(mfcc, ((0, 0), (0, MAX_TIMESTEPS - mfcc.shape[1])), mode='constant')
    else:
        mfcc = mfcc[:, :MAX_TIMESTEPS]
    
    return mfcc.T[np.newaxis, ...]  # Add batch dimension

def predict_class(uploaded_file):
    """Predict lung disease class from uploaded audio file"""
    if uploaded_file:
        processed_audio = preprocess_audio(uploaded_file)
        prediction = model.predict(processed_audio)
        return CLASSES[np.argmax(prediction)]
    return "No file uploaded"

# ======================
# 3. Flask App
# ======================
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = None
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file part"
        file = request.files['file']
        if file.filename == '':
            return "No selected file"
        if file:
            prediction = predict_class(file)
    return render_template('index.html', prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)


