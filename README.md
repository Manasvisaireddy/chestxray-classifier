# Chest X-Ray Disease Classifier
[![Live Demo](https://img.shields.io/badge/🤗%20Live%20Demo-HuggingFace%20Spaces-blue)](https://huggingface.co/spaces/ManasviSaireddy/chestxray-classifier)
[![Model Weights](https://img.shields.io/badge/🤗%20Model%20Weights-HuggingFace%20Hub-yellow)](https://huggingface.co/ManasviSaireddy/chestxray-densenet121)
[![Made with PyTorch](https://img.shields.io/badge/Made%20with-PyTorch-red)](https://pytorch.org)


A deep learning system that detects 14 thoracic diseases from chest X-rays, 
achieving **mean AUC of 0.8497** on the official NIH test set — exceeding the 
Stanford CheXNet benchmark (0.8417).

## Live Demo
🔗 https://huggingface.co/spaces/ManasviSaireddy/chestxray-classifier

## Results

| Disease | CheXNet | This Model |
|---|---|---|
| Atelectasis | 0.8094 | 0.7785 |
| Cardiomegaly | 0.9248 | **0.9258** |
| Effusion | 0.8638 | 0.8366 |
| Infiltration | 0.7345 | 0.7208 |
| Mass | 0.8676 | 0.8573 |
| Nodule | 0.7802 | **0.7835** |
| Pneumonia | 0.7680 | **0.7912** |
| Pneumothorax | 0.8887 | **0.8987** |
| Consolidation | 0.7901 | 0.7764 |
| Edema | 0.8878 | 0.8837 |
| Emphysema | 0.9371 | **0.9500** |
| Fibrosis | 0.8047 | **0.8893** |
| Pleural_Thickening | 0.8062 | **0.8170** |
| Hernia | 0.9164 | **0.9876** |
| **Mean** | **0.8417** | **0.8497** |

## Architecture

- **Model:** DenseNet121 pretrained on ImageNet, fine-tuned on NIH ChestX-ray14
- **Dataset:** 112,120 frontal chest X-rays, 14 disease labels
- **Loss:** BCEWithLogitsLoss with pos_weight for class imbalance
- **Explainability:** Grad-CAM heatmaps highlight disease regions
- **Evaluation:** Per-class AUC on official NIH test split

## Tech Stack

| Layer | Technology |
|---|---|
| Model | PyTorch, DenseNet121 |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Recharts |
| Deployment | HuggingFace Spaces, Docker |
| Training | Kaggle T4 GPU |

## Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## How It Works

1. User uploads a chest X-ray image
2. Image is preprocessed and passed through DenseNet121
3. Model outputs probability for each of 14 diseases
4. Grad-CAM generates a heatmap showing which lung regions influenced the prediction
5. Results displayed with confidence scores and visual overlay

## References

- [CheXNet: Radiologist-Level Pneumonia Detection (Stanford, 2017)](https://arxiv.org/abs/1711.05225)
- [NIH ChestX-ray14 Dataset](https://nihcc.app.box.com/v/ChestXray-NIHCC)
- [Densely Connected Convolutional Networks](https://arxiv.org/abs/1608.06993)
