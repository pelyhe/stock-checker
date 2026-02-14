import { Injectable } from '@nestjs/common';
import { FinnhubService } from 'src/finnhub/finnhub.service';

@Injectable()
export class StockService {
  constructor(private readonly finnhubService: FinnhubService) {}

  async getStockPrice(symbol: string): Promise<void> {
    await this.finnhubService.getStockPrice(symbol);
  }
}
