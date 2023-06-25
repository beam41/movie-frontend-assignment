FROM node:18-alpine as builder

WORKDIR /app

RUN npm i pnpm -g

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY .eslintrc.js .prettierignore .prettierrc.js tsconfig.json next.config.js env.d.ts next-env.d.ts .env .env.local ./
COPY public/  ./public
COPY src/ ./src

RUN pnpm build

FROM nginx:alpine as runner

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/out ./out