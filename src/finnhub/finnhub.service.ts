import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FinnhubQuoteResponse } from 'types/finnhub';

@Injectable()
export class FinnhubService {
  private readonly logger = new Logger(FinnhubService.name);
  private readonly base_url: string = 'https://finnhub.io/api/v1';
  private readonly api_key: string;

  constructor(private readonly configService: ConfigService) {
    this.api_key = this.configService.get('FINNHUB_API_KEY') ?? '';
  }

  // finnhub response for invalid symbol:
  // { c: 0, d: null, dp: null, h: 0, l: 0, o: 0, pc: 0, t: 0 }
  private _isSymbolInvalid(data: FinnhubQuoteResponse): boolean {
    return (
      data.c === 0 &&
      data.d === null &&
      data.dp === null &&
      data.h === 0 &&
      data.l === 0 &&
      data.o === 0 &&
      data.pc === 0 &&
      data.t === 0
    );
  }

  async getQuote(symbol: string): Promise<FinnhubQuoteResponse> {
    const response = await fetch(
      `${this.base_url}/quote?symbol=${symbol}&token=${this.api_key}`,
    );

    if (!response.ok) {
      this.logger.error(
        `Finnhub API error: ${response.status} ${response.statusText}`,
      );
      throw new BadGatewayException(
        `Finnhub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as FinnhubQuoteResponse;

    if (this._isSymbolInvalid(data)) {
      this.logger.warn(`Symbol ${symbol} not found in Finnhub`);
      throw new NotFoundException('Symbol not found');
    }

    return data;
  }
}
