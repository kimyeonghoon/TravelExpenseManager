from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, expenses
from app.core.config import settings

app = FastAPI(
    title="Travel Expense Manager API",
    description="일본 여행 지출 기록을 위한 FastAPI 백엔드",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(auth.router, prefix="/api/auth", tags=["인증"])
app.include_router(expenses.router, prefix="/api/expenses", tags=["지출 관리"])

@app.get("/")
async def root():
    return {"message": "Travel Expense Manager API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
