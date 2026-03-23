from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import sentiment

app = FastAPI(title="Tweet Sentiment Analyzer")

allowed_origins = [
    "*"  # Allow all origins for development; restrict in production!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment.router)

@app.get("/health")
async def health_check():
    return {"status": 1, "message": "API is healthy and running!"}

@app.get("/")
async def root():
    return {"status": 1, "message": "Welcome to the Tweet Sentiment Analyzer API!"}