
# Tweet Sentiment Analyzer

A full-stack web application for analyzing the sentiment of tweets using state-of-the-art machine learning models. The backend leverages both traditional rule-based sentiment analysis (NLTK VADER) and advanced transformer models from Hugging Face (such as RoBERTa, DistilBERT, and FinBERT) to provide accurate and flexible sentiment detection. The frontend is built with React (Vite) for a modern, responsive user experience. The entire project is containerized with Docker and orchestrated using Docker Compose for easy deployment.

---

## Brief Explanation

This project enables users to analyze the sentiment of tweets or any short text using multiple models:
- **VADER (NLTK):** Fast, rule-based sentiment analysis, ideal for general English text.
- **Hugging Face Transformers:**
   - **RoBERTa:** High-accuracy model for social media sentiment.
   - **DistilBERT:** Lightweight, balanced model for multilingual sentiment.
   - **FinBERT:** Specialized for financial and market sentiment.

Users can select the model best suited for their needs. The backend exposes REST API endpoints for sentiment analysis, and the frontend provides an intuitive interface for submitting text and viewing results in real time.

---


## Features
- **Real-time tweet sentiment analysis** (positive, negative, neutral)
- **Multiple sentiment models:** Choose between NLTK VADER and Hugging Face transformer models (RoBERTa, DistilBERT, FinBERT)
- **REST API** built with FastAPI
- **Modern React frontend** (Vite, React 18)
- **Dockerized** for easy deployment
- **Local development and production ready**

---

## Project Structure

```
root/
│
├── backend/           # FastAPI backend (Python)
│   ├── main.py        # FastAPI app entrypoint
│   ├── requirements.txt
│   ├── Dockerfile
│   └── ...
│
├── Front-end/         # React frontend (Vite)
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
└── docker-compose.yml # Orchestration for backend & frontend
```

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)

### Quick Start (Docker Compose)

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd tweet-sentiment-project
   ```
2. Build and start all services:
   ```sh
   docker-compose up --build
   ```
3. Access the app:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

---


## Backend (FastAPI)
- **Location:** `backend/`
- **Main dependencies:** FastAPI, Uvicorn, NLTK, httpx
- **Entrypoint:** `main.py`
- **API Docs:** `/docs` (Swagger UI)
- **Environment:** Configure variables in `backend/.env`
- **Hugging Face Integration:** Requires a Hugging Face API token in `.env` as `HF_TOKEN` for transformer models.

### Example Endpoints
- `GET /health` — Health check
- `GET /sentiment/get_models` — List available sentiment models
- `POST /sentiment/analyze` — Analyze tweet sentiment (choose model)

---


## Frontend (React + Vite)
- **Location:** `Front-end/`
- **Main dependencies:** React, Vite
- **Dev server:** `npm run dev` (port 5173)
- **Production:** Served via Nginx in Docker
- **Features:** Model selection, real-time results, user-friendly interface

---


## Development (without Docker)

### Backend
```sh
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
# Add your Hugging Face token to .env as HF_TOKEN=your_token_here
uvicorn main:app --reload
```

### Frontend
```sh
cd Front-end
npm install
npm run dev
```

---

## License
MIT

---

## Acknowledgments
- [FastAPI](https://fastapi.tiangolo.com/)
- [NLTK](https://www.nltk.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
