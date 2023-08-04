FROM node:17

WORKDIR /app

COPY . /app

RUN npm install --omit=dev

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
