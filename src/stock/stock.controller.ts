import { Controller, Get, Param, Put } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { StockData, WatchStockResponse } from 'types/stock';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'Get stock data',
    description:
      'Returns the latest price and moving average for a watched stock symbol',
    tags: ['stock'],
  })
  @ApiParam({
    name: 'symbol',
    description: 'Stock ticker symbol (e.g. AAPL, MSFT, GOOGL)',
    example: 'AAPL',
  })
  @ApiOkResponse({ type: StockData, description: 'Stock data retrieved' })
  @ApiNotFoundResponse({ description: 'Stock not found' })
  @Get(':symbol')
  async getStockPrice(@Param('symbol') symbol: string): Promise<StockData> {
    return await this.stockService.getStockData(symbol);
  }

  @ApiOperation({
    summary: 'Start watching a stock',
    description:
      'Begins periodic price tracking for the given stock symbol (fetches every 60 seconds)',
    tags: ['stock'],
  })
  @ApiParam({
    name: 'symbol',
    description: 'Stock ticker symbol to start watching (e.g. AAPL, MSFT)',
    example: 'AAPL',
  })
  @ApiOkResponse({
    type: WatchStockResponse,
    description: 'Stock is now being watched',
  })
  @ApiNotFoundResponse({ description: 'Symbol not found on Finnhub' })
  @Put(':symbol')
  async startWatchingStock(
    @Param('symbol') symbol: string,
  ): Promise<WatchStockResponse> {
    await this.stockService.startWatchingStock(symbol);
    return { message: `${symbol} is now being watched` };
  }
}
