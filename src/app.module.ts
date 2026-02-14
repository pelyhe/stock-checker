import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinnhubModule } from './finnhub/finnhub.module';
import { FinnhubService } from './finnhub/finnhub.service';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FinnhubModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService, FinnhubService],
})
export class AppModule {}
