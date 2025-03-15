FROM node:22.12.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV $(cat .env-temp | xargs )

ARG VITE_GENERATE_SOURCEMAP
ENV VITE_GENERATE_SOURCEMAP=${VITE_GENERATE_SOURCEMAP}

RUN npm run build

FROM nginx:alpine

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}





EXPOSE 8080

COPY config/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/app/nginx/conf.d/ /etc/nginx/conf.d/
COPY config/app/entrypoint.sh /entrypoint.sh
COPY config/app/nginx/init-scripts/ /docker-entrypoint.d/

RUN chmod +x /entrypoint.sh /docker-entrypoint.d/*.sh

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./

