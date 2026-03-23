from pydantic import BaseModel, Field, validator
from config import available_models

class SentimentRequest(BaseModel):
    text: str = Field(..., description="The text to analyze for sentiment")
    model: str = Field("Roberta", description=f"The sentiment analysis model to use (e.g., {', '.join(available_models.keys())})")
    
    @validator('model')
    def validate_model(cls, v):
        if v not in available_models.keys():
            raise ValueError(f"Model must be one of {list(available_models.keys())}")
        return v