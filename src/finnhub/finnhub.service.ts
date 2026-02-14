import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FinnhubQuoteResponse } from 'types/finnhub';

@Injectable()
export class FinnhubService {
  private readonly base_url: string = 'https://finnhub.io/api/v1';
  private readonly api_key: string;

  constructor(private readonly configService: ConfigService) {
    this.api_key = this.configService.get('FINNHUB_API_KEY') ?? '';
  }

  async getQuote(symbol: string): Promise<FinnhubQuoteResponse> {
    const response = await fetch(
      `${this.base_url}/quote?symbol=${symbol}&token=${this.api_key}`,
    );
    return (await response.json()) as FinnhubQuoteResponse;
  }
}
