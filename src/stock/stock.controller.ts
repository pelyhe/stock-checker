import { Controller, Get, Param, Put } from '@nestjs/common';
import { StockData } from 'types/finnhub';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  async getStockPrice(@Param('symbol') symbol: string): Promise<StockData> {
    return await this.stockService.getStockData(symbol);
  }

  @Put(':symbol')
  async startWatchingStock(@Param('symbol') symbol: string): Promise<void> {
    return await this.stockService.startWatchingStock(symbol);
  }
}
