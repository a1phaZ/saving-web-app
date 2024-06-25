import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Bill, IBillHistoryItem } from '@tg-web-app/entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { BillModel } from './bill.schema';

export type BillHistoryItemDocument = HydratedDocument<BillHistoryItemModel>;

@Schema({
  timestamps: true,
})
export class BillHistoryItemModel implements Partial<IBillHistoryItem> {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: BillModel.name,
  })
  Bill: BillModel;

  @Prop()
  Sum: number;
  @Prop()
  Description: string;
  @Prop()
  Owner: number;
}

export const BillHistoryItemSchema =
  SchemaFactory.createForClass(BillHistoryItemModel);
