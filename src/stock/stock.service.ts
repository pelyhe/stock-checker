import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FinnhubService } from 'src/finnhub/finnhub.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockData } from 'types/finnhub';

@Injectable()
export class StockService {
  constructor(
    private readonly finnhubService: FinnhubService,
    private readonly prismaService: PrismaService,
  ) {}

  private _calculateMovingAverage(last10Prices: number[]): number | null {
    if (last10Prices.length < 10) return null;

    return (
      last10Prices.reduce((acc, price) => acc + price, 0) / last10Prices.length
    );
  }

  // TODO: use nestjs scheduler to get stock data every 1 minute
  async startWatchingStock(symbol: string): Promise<void> {}

  async getStockData(symbol: string): Promise<StockData> {
    const stock = await this.prismaService.stock.findMany({
      where: { symbol },
      orderBy: { fetchedAt: 'desc' },
      take: 10,
    });

    if (!stock?.length) {
      throw new NotFoundException('Stock not found');
    }

    const movingAverage = this._calculateMovingAverage(
      stock.map((s) => s.price),
    );

    if (!movingAverage)
      throw new UnprocessableEntityException(
        'Not enough prices to calculate moving average',
      );

    return {
      symbol,
      currentPrice: stock[stock.length - 1].price,
      movingAverage,
      fetchedAt: stock[stock.length - 1].fetchedAt,
    };
  }
}
