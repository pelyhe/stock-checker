import { ApiProperty } from '@nestjs/swagger';

export class StockData {
  @ApiProperty({ example: 'AAPL', description: 'Stock ticker symbol' })
  symbol: string;
  @ApiProperty({ example: 178.72, description: 'Current stock price' })
  currentPrice: number;
  @ApiProperty({
    example: '2026-02-15T12:00:00.000Z',
    description: 'Timestamp of the most recent price fetch',
  })
  fetchedAt: Date;
  @ApiProperty({
    example: 176.35,
    description:
      'Moving average of the last 10 fetched prices, null if fewer than 10 data points',
    nullable: true,
  })
  movingAverage: number | null;
}

export class WatchStockResponse {
  @ApiProperty({
    example: 'AAPL is now being watched',
    description: 'Confirmation message',
  })
  message: string;
}
