import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillModel, BillSchema } from '../../schemas/bill.schema';
import {
  BillHistoryItemModel,
  BillHistoryItemSchema,
} from '../../schemas/bill-history-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BillModel.name,
        schema: BillSchema,
      },
      {
        name: BillHistoryItemModel.name,
        schema: BillHistoryItemSchema,
      },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
