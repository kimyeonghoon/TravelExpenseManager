# Travel Expense Manager (일본 여행 지출 기록 웹 프로그램)

일본 여행 중 발생하는 지출 내역을 등록, 조회, 수정, 삭제할 수 있는 웹 애플리케이션입니다.

## 🚀 기술 스택

### Backend
- **FastAPI** - 현대적이고 빠른 Python 웹 프레임워크
- **SQLAlchemy** - ORM 및 데이터베이스 관리
- **Pydantic** - 데이터 검증 및 직렬화
- **JWT** - 사용자 인증 토큰

### Frontend
- **React 18** - 사용자 인터페이스 구축
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Axios** - HTTP 클라이언트

## 📁 프로젝트 구조

```
TravelExpenseManager/
├── backend/                 # FastAPI 백엔드
│   ├── app/
│   │   ├── routers/        # API 라우터
│   │   ├── models/         # 데이터베이스 모델
│   │   ├── schemas/        # Pydantic 스키마
│   │   ├── crud/           # CRUD 작업
│   │   ├── services/       # 비즈니스 로직
│   │   └── core/           # 설정 및 유틸리티
│   ├── requirements.txt    # Python 의존성
│   └── main.py            # 애플리케이션 진입점
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   └── services/       # API 서비스
│   ├── package.json        # Node.js 의존성
│   └── vite.config.js      # Vite 설정
└── README.md               # 프로젝트 설명서
```

## 🛠️ 설치 및 실행

### Backend 설정

1. Python 가상환경 생성 및 활성화
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

2. 의존성 설치
```bash
pip install -r requirements.txt
```

3. 환경 변수 설정
```bash
copy env.example .env
# .env 파일에서 필요한 값들을 설정
```

4. 서버 실행
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend 설정

1. 의존성 설치
```bash
cd frontend
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 빌드
```bash
npm run build
```

## 🌟 주요 기능

- **공개 지출 내역 조회** - 로그인 없이 모든 방문자가 볼 수 있는 지출 목록
- **이메일 기반 인증** - 2단계 인증(이메일 → 인증코드) 로그인
- **개인 지출 관리** - CRUD 기능으로 지출 내역 관리
- **카테고리별 분류** - 숙박, 교통, 식비, 입장료, 쇼핑, 기타
- **결제 방식 관리** - 신용카드, 현금, 온라인결제 등
- **반응형 디자인** - 모바일 및 데스크톱 환경 최적화

## 🔒 보안 기능

- JWT 토큰 기반 인증
- 이메일 인증 코드 검증
- 입력 데이터 검증 및 서버 단 검증
- CORS 설정으로 보안 강화

## 📱 사용자 인터페이스

- **모달 기반 로그인** - 단계별 인증 과정
- **인라인 편집** - 같은 페이지에서 수정 가능
- **실시간 검증** - 입력 시 즉시 유효성 검사
- **직관적 UI** - 사용자 친화적 인터페이스

## 🚀 개발 환경

- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000
- **API 문서**: http://localhost:8000/docs (Swagger UI)

## 📝 API 엔드포인트

### 인증
- `POST /api/auth/send-code` - 인증 코드 발송
- `POST /api/auth/verify-code` - 인증 코드 검증
- `POST /api/auth/logout` - 로그아웃

### 지출 관리
- `GET /api/expenses/public` - 공개 지출 내역 조회
- `GET /api/expenses/` - 개인 지출 내역 조회
- `POST /api/expenses/` - 지출 내역 등록
- `PUT /api/expenses/{id}` - 지출 내역 수정
- `DELETE /api/expenses/{id}` - 지출 내역 삭제

## 🤝 기여 방법

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요. 
