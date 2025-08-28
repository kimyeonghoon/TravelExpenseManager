from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # 데이터베이스 설정
    database_url: str = "sqlite:///./travel_expenses.db"
    
    # 보안 설정
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # 이메일 설정
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    
    # 앱 설정
    debug: bool = True
    allowed_hosts: List[str] = ["*"]
    
    class Config:
        env_file = ".env"

settings = Settings()
