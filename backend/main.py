from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from model import ChestXrayModel, LABELS
from gradcam import generate_heatmap
from utils import load_image

app = FastAPI(title="Chest X-Ray Classifier")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = ChestXrayModel()

@app.get("/")
def health_check():
    return {"status": "running", "model": "DenseNet121", "classes": len(LABELS)}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    file_bytes = await file.read()
    image = load_image(file_bytes)
    probs = model.predict(image)

    predictions = {
        label: round(float(prob), 4)
        for label, prob in zip(LABELS, probs)
    }

    top_condition = max(predictions, key=predictions.get)
    top_idx = LABELS.index(top_condition)
    heatmap = generate_heatmap(model, image, class_idx=top_idx)

    return {
        "predictions": predictions,
        "top_condition": top_condition,
        "top_confidence": predictions[top_condition],
        "heatmap": heatmap
    }