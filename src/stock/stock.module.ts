import { Module } from '@nestjs/common';
import { FinnhubModule } from 'src/finnhub/finnhub.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [FinnhubModule, PrismaModule],
  providers: [StockService],
  exports: [StockService],
  controllers: [StockController],
})
export class StockModule {}
