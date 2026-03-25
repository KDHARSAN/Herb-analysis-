import traceback
import keras

try:
    keras.models.load_model(r"D:\mani_project\herb_model_fixed.keras", safe_mode=False)
    print("Success")
except Exception as e:
    with open("err.txt", "w") as f:
        traceback.print_exc(file=f)
