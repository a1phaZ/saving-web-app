import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionModel } from '../../schemas/transaction.schema';
import { Model } from 'mongoose';
import { ITransaction } from '@tg-web-app/entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionModel.name)
    private transactionModel: Model<TransactionModel>
  ) {}

  async getAll(owner: number): Promise<TransactionModel[]> {
    return this.transactionModel.find({ Owner: owner }).exec();
  }

  async get(owner: number, walletId: string): Promise<TransactionModel[]> {
    return this.transactionModel
      .find({ Owner: owner, Source: walletId })
      .exec();
  }

  async add(data: Partial<ITransaction>): Promise<TransactionModel> {
    const dataToSave: Partial<TransactionModel> = {
      Type: data.Type,
      Cashflow: data.Cashflow,
      Source: data.Source,
      Target: data.Target,
      Amount: data.Amount * data.Cashflow,
      Owner: data.Owner,
      Description: data.Description,
      Timestamp: data.Timestamp,
    };
    const createdTransaction = new this.transactionModel(dataToSave);
    return createdTransaction.save();
  }

  async deleteOne(owner: number, id: string) {
    return this.transactionModel.deleteOne({ Owner: owner, _id: id }).exec();
  }

  async deleteAll(owner: number) {
    return this.transactionModel.deleteMany({ Owner: owner }).exec();
  }
}
