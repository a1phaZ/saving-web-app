import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransaction } from '@tg-web-app/entity';

export type TransactionDocument = HydratedDocument<TransactionModel>;

@Schema({
  timestamps: true,
})
export class TransactionModel implements Partial<ITransaction> {
  @Prop({
    required: true,
  })
  Type: string; // Внешнее/внутреннее

  @Prop({
    required: true,
  })
  Cashflow: -1 | 1; // Направление движения ден. средств

  @Prop({})
  Source: string;

  @Prop({})
  Target: string;

  @Prop({
    required: true,
  })
  Amount: number;

  @Prop({
    required: true,
  })
  Owner: string;

  @Prop()
  Description: string;

  @Prop()
  Timestamp: number;

  @Prop()
  Id: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
