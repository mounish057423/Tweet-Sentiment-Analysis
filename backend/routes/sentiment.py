from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
import httpx
from config import HF_TOKEN, HF_URL, ROBERTA_MODEL_ID, available_models
from schemas import SentimentRequest
import os
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

router = APIRouter(prefix="/sentiment", tags=["sentiment"])

# nltk.download('vader_lexicon', quiet=True)
# sia = SentimentIntensityAnalyzer()
# Create local nltk_data folder
nltk_data_path = os.path.join(os.getcwd(), "nltk_data")
os.makedirs(nltk_data_path, exist_ok=True)

# Tell nltk to use this path
nltk.data.path.append(nltk_data_path)

# Download if not present
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', download_dir=nltk_data_path)

from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

@router.get("/get_models")
async def get_available_models():
    try:
        return JSONResponse(content={"status": 1, "models": [{"name": name, "description": desc} for name, (_, desc) in available_models.items()]})
    except Exception as e:
        print(f"Error: {repr(e)}")
        return JSONResponse(status_code=500, content={"status": 0, "message": "Internal Server Error"})

@router.post("/analyze")
async def analyze_sentiment(payload: SentimentRequest = Body(...)):
    try:
        text = payload.text
        model = payload.model
        if not text.strip():
            return JSONResponse(
                content={"status": 0, "message": "'text' must be a non-empty string"},
            )

                
        if model == "Vader":
            vader_result = await get_vader_sentiment(text)
            return JSONResponse(content={"status": 1, **vader_result})
        
        elif model in available_models.keys():
            MODEL_ID = available_models[model][0]
            raw_sentiment = await get_hf_sentiment(text, model_url=f"{HF_URL}/{MODEL_ID}")
            
            result = raw_sentiment[0][0]

            return JSONResponse(content={
                "status": 1, 
                "label": result["label"], 
                "score": result["score"]
            })
        
    except Exception as e:
        print(f"Error: {repr(e)}") 
        return JSONResponse(status_code=500, content={"status": 0, "message": "Internal Server Error"})
    
async def get_vader_sentiment(text: str) -> dict:
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    if compound >= 0.05:
        label = "POSITIVE"
        score = scores['pos'] 
    elif compound <= -0.05:
        label = "NEGATIVE"
        score = scores['neg'] 
    else:
        label = "NEUTRAL"
        score = scores['neu']
    return {"label": label, "score": round(score, 4)}

async def get_hf_sentiment(text: str, model_url: str = f"{HF_URL}/{ROBERTA_MODEL_ID}") -> dict:
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {"inputs": text}
    
    async with httpx.AsyncClient(timeout=45) as client:
        response = await client.post(model_url, headers=headers, json=payload)

        response.raise_for_status() 
        
        return response.json()