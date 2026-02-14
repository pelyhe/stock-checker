import { Module } from '@nestjs/common';
import { FinnhubModule } from 'src/finnhub/finnhub.module';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [FinnhubModule],
  providers: [StockService],
  exports: [StockService],
  controllers: [StockController],
})
export class StockModule {}
