# 1단계: 빌드 단계 (Node.js 20 사용)
FROM node:20-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 Vite 빌드
COPY . .
RUN npm run build

# 2단계: 프로덕션 배포용 (Nginx 사용)
FROM nginx:alpine

# 기본 nginx 설정 파일을 삭제합니다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사합니다.
COPY nginx.conf /etc/nginx/conf.d

# 빌드된 정적 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx가 실행될 때 포트를 외부에 노출 (선택)
EXPOSE 5173

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
