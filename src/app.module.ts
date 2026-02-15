import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinnhubModule } from './finnhub/finnhub.module';
import { PrismaModule } from './prisma/prisma.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FinnhubModule,
    StockModule,
    PrismaModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
