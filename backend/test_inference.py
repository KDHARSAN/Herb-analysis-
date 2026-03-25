import sys
import os
import numpy as np

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__name__)))

from main import build_and_load_model

try:
    print("Testing build_and_load_model()...")
    model = build_and_load_model()
    
    print("Testing inference...")
    dummy_input = np.random.rand(1, 240, 240, 3).astype(np.float32)
    preds = model.predict(dummy_input)
    
    print("Prediction shape:", preds.shape)
    print("Max prediction:", np.max(preds))
    print("Argmax:", np.argmax(preds))
    print("Sum:", np.sum(preds))
    print("SUCCESS!")
except Exception as e:
    import traceback
    traceback.print_exc()
    print("ERROR:", e)
