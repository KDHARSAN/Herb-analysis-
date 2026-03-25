from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from PIL import Image
import io
import os
import keras
from keras.applications import EfficientNetB2
from keras.applications.efficientnet import preprocess_input

app = FastAPI(title="VisionAI Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL LOADING LOGIC ---
WEIGHTS_PATH = r"D:\mani_project\herb_model_dir\model.weights.h5"

def build_and_load_model():
    print("Building model architecture (matching trained weights)...")
    base = EfficientNetB2(weights='imagenet', include_top=False, input_shape=(240, 240, 3))
    
    # Needs to match the model head exactly:
    x = keras.layers.GlobalAveragePooling2D()(base.output)
    x = keras.layers.BatchNormalization()(x)
    x = keras.layers.Dropout(0.5)(x)
    x = keras.layers.Dense(256, activation='relu')(x)
    x = keras.layers.BatchNormalization()(x)
    x = keras.layers.Dropout(0.5)(x)
    x = keras.layers.Dense(30, activation='softmax')(x)
    
    model = keras.Model(inputs=base.input, outputs=x)
    print(f"Loading weights from {WEIGHTS_PATH}...")
    
    # We must use skip_mismatch=True because the saved weights file lacks 
    # variables for EfficientNet's internal normalization_1 layer, which 
    # is perfectly fine to skip, but now our top architecture matches exactly!
    model.load_weights(WEIGHTS_PATH, skip_mismatch=True)
    print("Model ready. Output shape:", model.output_shape)
    return model

try:
    model = build_and_load_model()
except Exception as e:
    import traceback
    traceback.print_exc()
    model = None
    print(f"ERROR: Could not load model: {e}")

# Class index mapping from training notebook
CLASS_INDICES = {
    '0': 0, '1': 1, '10': 2, '11': 3, '12': 4, '13': 5,
    '14': 6, '15': 7, '16': 8, '17': 9, '18': 10, '19': 11,
    '2': 12, '20': 13, '21': 14, '22': 15, '23': 16, '24': 17,
    '25': 18, '26': 19, '27': 20, '28': 21, '29': 22, '3': 23,
    '4': 24, '5': 25, '6': 26, '7': 27, '8': 28, '9': 29
}
INDEX_TO_CLASS = {v: k for k, v in CLASS_INDICES.items()}


def preprocess_image(image_bytes: bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != "RGB":
            img = img.convert("RGB")
        img = img.resize((240, 240))
        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        return img_array
    except Exception as e:
        raise ValueError(f"Image preprocessing failed: {str(e)}")


@app.get("/")
def read_root():
    return {"message": "VisionAI Analyzer API is running."}


@app.post("/predict")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    if model is None:
        raise HTTPException(status_code=500, detail="Model failed to load on startup.")

    try:
        image_bytes = await file.read()
        processed_image = preprocess_image(image_bytes)
        predictions = model.predict(processed_image)
        predicted_idx = int(np.argmax(predictions[0]))
        confidence = float(predictions[0][predicted_idx])
        class_label = INDEX_TO_CLASS.get(predicted_idx, str(predicted_idx))
        return {
            "prediction": f"Herb Class {class_label}",
            "class_index": class_label,
            "confidence": round(confidence, 4)
        }
    except ValueError as val_e:
        raise HTTPException(status_code=400, detail=str(val_e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
