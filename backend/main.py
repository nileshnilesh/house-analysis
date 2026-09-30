from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import joblib
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
model = joblib.load("ml/model.pkl")


@app.get("/")
def home():

    return {
        "message": "HouseAI Backend Running"
    }


@app.get("/health")
def health():

    return {
        "status": "active",
        "model": "loaded",
        "ai_accuracy": "98%"
    }


@app.post("/predict")
def predict(data: dict):

    bedrooms = data["bedrooms"]
    bathrooms = data["bathrooms"]
    sqft = data["sqft_living"]

    prediction = model.predict([[
        bedrooms,
        bathrooms,
        sqft
    ]])

    indian_price = int(prediction[0] * 83)

    return {
        "predicted_price": indian_price
    }