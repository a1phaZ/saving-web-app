import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWallet } from '@tg-web-app/entity';

export type WalletDocument = HydratedDocument<WalletModel>;

@Schema({
  timestamps: true,
})
export class WalletModel implements Partial<IWallet> {
  @Prop({
    required: true,
  })
  Title!: string;
  @Prop({
    default: 0,
  })
  Balance!: number;
  @Prop({
    default: false,
  })
  Active!: boolean;
  @Prop({
    default: -1,
  })
  Owner!: number;
  @Prop()
  Description!: string;
}

export const WalletSchema = SchemaFactory.createForClass(WalletModel);
