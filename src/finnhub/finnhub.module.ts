import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FinnhubService } from './finnhub.service';

@Module({
  imports: [ConfigModule],
  providers: [FinnhubService],
  exports: [FinnhubService],
})
export class FinnhubModule {}
