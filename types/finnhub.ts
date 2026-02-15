export interface FinnhubQuoteResponse {
  c: number; // Current price
  d: number | null; // Change
  dp: number | null; // Percent change
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close price
  t: number; // Timestamp
}
