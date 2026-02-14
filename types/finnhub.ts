export interface FinnhubQuoteResponse {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface StockData {
  symbol: string;
  currentPrice: number;
  fetchedAt: Date;
  movingAverage: number;
}
