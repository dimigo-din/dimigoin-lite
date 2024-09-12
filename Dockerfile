FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]

LABEL org.opencontainers.image.source=https://github.com/dimigo-din/dimigoin-lite