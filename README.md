# stock-checker

NestJS API that tracks stock prices via the Finnhub API. Stores price history in SQLite and calculates a moving average over the last 10 data points.

## Setup

```
cp .env.example .env
```

Fill in `FINNHUB_API_KEY` with your key.

## Local development

```
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

The API runs on `http://localhost:3000/api/v1` by default. Swagger docs are at `/docs`.

## Docker

```
docker build -t stock-checker .
docker run -p 3007:3000 stock-checker // I used port 3007 for testing.
```

The container handles database setup and Prisma generation on its own. The Finnhub API key is read from the `.env` file baked into the image. To pass it at runtime instead:

```
docker run -p 3007:3000 --env-file .env stock-checker
```

## API

- `PUT /api/v1/stock/:symbol` -- start watching a stock (fetches price every 60s)
- `GET /api/v1/stock/:symbol` -- get latest price and moving average
