import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# Hugging Face Inference API base URL
HF_URL = "https://router.huggingface.co/hf-inference/models"

# Tweet sentiment model ID
ROBERTA_MODEL_ID = "cardiffnlp/twitter-roberta-base-sentiment-latest"
DISTILLBERT_MODEL_ID = "lxyuan/distilbert-base-multilingual-cased-sentiments-student"
FINBERT_MODEL_ID = "ProsusAI/finbert"

available_models = {
    "Vader": ["Vader", "Instant (Rule-Based)"],
    "DistilBERT": [DISTILLBERT_MODEL_ID, "Fast & Balanced (Lightweight)"],
    "FinBERT": [FINBERT_MODEL_ID, "Finance & Market Specialist"],
    "Roberta": [ROBERTA_MODEL_ID, "Highest Accuracy (Social Media)"],
}

# Read from .env: HF_TOKEN=your_token_here
HF_TOKEN = os.getenv("HF_TOKEN", "")