import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  async getStockPrice(@Param('symbol') symbol: string): Promise<void> {
    await this.stockService.getStockPrice(symbol);
  }
}
