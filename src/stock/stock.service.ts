import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { FinnhubService } from 'src/finnhub/finnhub.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockData } from 'types/finnhub';

@Injectable()
export class StockService implements OnModuleInit {
  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly finnhubService: FinnhubService,
    private readonly prismaService: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    const watchedStocks = await this.prismaService.stock.findMany({
      select: { symbol: true },
      distinct: ['symbol'],
    });

    for (const { symbol } of watchedStocks) {
      this._registerInterval(symbol);
    }
  }

  private _calculateMovingAverage(last10Prices: number[]): number | null {
    if (last10Prices.length < 10) return null;

    return (
      last10Prices.reduce((acc, price) => acc + price, 0) / last10Prices.length
    );
  }

  private _registerInterval(symbol: string) {
    if (this.schedulerRegistry.doesExist('interval', symbol)) return;

    const interval = setInterval(() => {
      this.logger.log(`Fetching stock data for symbol ${symbol}`);
      this._fetchAndSaveStockData(symbol).catch((err) =>
        this.logger.error(`Failed to fetch symbol ${symbol}: ${err}`),
      );
    }, 60_000);

    this.schedulerRegistry.addInterval(symbol, interval);
    this.logger.log(`Registered interval for symbol ${symbol}`);
  }

  private async _fetchAndSaveStockData(symbol: string) {
    const stockData = await this.finnhubService.getQuote(symbol);
    await this.prismaService.stock.create({
      data: {
        symbol,
        price: stockData.c,
        change: stockData.d ?? 0,
        percentChange: stockData.dp ?? 0,
        highPrice: stockData.h,
        lowPrice: stockData.l,
        openPrice: stockData.o,
        previousClosePrice: stockData.pc,
        fetchedAt: new Date(),
      },
    });
  }

  async startWatchingStock(symbol: string) {
    await this._fetchAndSaveStockData(symbol);
    this._registerInterval(symbol);
  }

  async getStockData(symbol: string): Promise<StockData> {
    const stocks = await this.prismaService.stock.findMany({
      where: { symbol },
      orderBy: { fetchedAt: 'desc' },
      take: 10,
    });

    if (!stocks?.length) {
      throw new NotFoundException('Stock not found');
    }

    const movingAverage = this._calculateMovingAverage(
      stocks.map((s) => s.price),
    );

    return {
      symbol,
      currentPrice: stocks[0].price,
      movingAverage,
      fetchedAt: stocks[0].fetchedAt,
    };
  }
}
