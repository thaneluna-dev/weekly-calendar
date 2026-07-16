from fastapi import FastAPI
from backend.routes.tasks import router as issues_router
from backend.routes.schemas import user_response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Issue Tracker API",
    version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://weekly-calendar-chi.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(issues_router)