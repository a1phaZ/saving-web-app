import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AccountModule } from './account/account.module';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';

import 'dotenv/config';
import { getMongoConfig } from './db-connect.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BillModule } from './bill/bill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Позволяет обратиться к env во всем приложении
      envFilePath: '.env', // Указываем путь до env файла
    }),
    MongooseModule.forRootAsync({
      // Модуль для работы с mongo
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig, // добавляем созданную ранее функцию подключения к БД
    }),
    AccountModule,
    WalletModule,
    TransactionModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
