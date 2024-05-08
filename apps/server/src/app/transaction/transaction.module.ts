import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  TransactionModel,
  TransactionSchema,
} from '../../schemas/transaction.schema';
import { WalletModel, WalletSchema } from '../../schemas/wallet.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TransactionModel.name,
        useFactory: (walletModel: Model<WalletModel>) => {
          const schema = TransactionSchema;
          schema.post('save', async function () {
            const source = this.Source;
            const target = this.Target;
            const owner = this.Owner;
            const cashflow = this.Cashflow;

            if (cashflow === -1) {
              await walletModel
                .findOneAndUpdate(
                  { Owner: owner, _id: source },
                  { $inc: { Balance: this.Amount } }
                )
                .exec();
            } else {
              await walletModel
                .findOneAndUpdate(
                  { Owner: owner, _id: target },
                  { $inc: { Balance: this.Amount } }
                )
                .exec();
            }
          });
          return schema;
        },
        inject: [getModelToken(WalletModel.name)],
        // schema: TransactionSchema,
      },
      {
        name: WalletModel.name,
        useFactory: () => WalletSchema,
      },
    ]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
