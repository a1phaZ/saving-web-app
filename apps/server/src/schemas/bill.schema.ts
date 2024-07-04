import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBill } from '@tg-web-app/entity';
import { HydratedDocument } from 'mongoose';

export type BillDocument = HydratedDocument<BillModel>;

@Schema()
export class BillModel implements Partial<IBill> {
  @Prop({
    required: true,
  })
  Title: string;
  @Prop({
    required: true,
  })
  Sum: number;
  @Prop({
    required: true,
  })
  PayDay: number;
  @Prop({
    required: true,
  })
  Period: number;
  @Prop()
  StopDate: Date;
  @Prop({
    required: true,
  })
  Owner: number;
  @Prop()
  Description: string;
  @Prop({
    default: true,
  })
  Active: boolean;
}

export const BillSchema = SchemaFactory.createForClass(BillModel);
