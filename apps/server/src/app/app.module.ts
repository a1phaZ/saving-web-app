import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AccountModule } from './account/account.module';
import { AppService } from './app.service';

import 'dotenv/config';

@Module({
  imports: [
    AccountModule,
    MongooseModule.forRoot(
      `${process.env.MONGO_CONNECTION_URL}/${process.env.DB_NAME}`
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
