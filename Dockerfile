FROM node:24

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

RUN mkdir -p /data
ENV DATABASE_URL="file:/data/stock-checker.db"
ENV PORT=3000

RUN npx prisma migrate dev

CMD ["node", "dist/src/main"]