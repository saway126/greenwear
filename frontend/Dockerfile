# 1. Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Serve Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA(Single Page Application)를 위한 Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
