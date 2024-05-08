import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletModel } from '../../schemas/wallet.schema';
import { Model } from 'mongoose';
import { IWallet } from '@tg-web-app/entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(WalletModel.name) private walletModel: Model<WalletModel>
  ) {}

  async get(owner: number): Promise<WalletModel[]> {
    return this.walletModel.find({ Owner: owner }).exec();
  }

  async add(data: Partial<IWallet>): Promise<WalletModel> {
    const dataToSave: Partial<IWallet> = {
      Title: data.Title,
      Description: data.Description,
      Balance: data.Balance,
      Active: !!data.Active,
      Owner: data.Owner,
    };
    const createdWallet = new this.walletModel(dataToSave);
    return createdWallet.save();
  }

  async getTotalBalance(owner: number, active = true, inactive = true) {
    let _match: { Owner: number; Active?: boolean } = { Owner: owner };
    if (active && !inactive) {
      _match = { ..._match, Active: true };
    } else if (!active && inactive) {
      _match = { ..._match, Active: false };
    }

    return this.walletModel
      .aggregate<{ _id: null; total: number }>([
        { $match: _match },
        { $group: { _id: null, total: { $sum: '$Balance' } } },
      ])
      .exec();
  }

  async deleteOne(owner: number, id: string) {
    return this.walletModel.deleteOne({ Owner: owner, _id: id }).exec();
  }

  async deleteAll(owner: number) {
    return this.walletModel.deleteMany({ Owner: owner }).exec();
  }
}
