import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BillModel } from '../../schemas/bill.schema';
import { Model } from 'mongoose';
import { IBill } from '@tg-web-app/entity';
import { BillHistoryItemModel } from '../../schemas/bill-history-item.schema';
// import { BillHistoryItemModel } from '../../schemas/bill-history-item.schema';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(BillModel.name)
    private billModel: Model<BillModel>,
    @InjectModel(BillHistoryItemModel.name)
    private readonly billHistoryItemModel: Model<BillHistoryItemModel>
  ) {}

  async get(owner: number): Promise<BillModel[]> {
    return this.billModel.find({ Owner: owner }).exec();
  }

  async getHistory(owner: number): Promise<BillHistoryItemModel[]> {
    return this.billHistoryItemModel.find({ Owner: owner }).exec();
  }

  async getHistoryByBillId(
    billId: string,
    owner: number
  ): Promise<BillHistoryItemModel> {
    return this.billHistoryItemModel
      .findOne({ Owner: owner, Bill: billId })
      .populate('Bill')
      .exec();
  }

  async add(data: Partial<IBill>): Promise<BillModel> {
    const dataToSave: Partial<IBill> = {
      Title: data.Title,
      Description: data.Description,
      Owner: data.Owner,
      Sum: data.Sum,
      Period: data.Period,
      StopDate: data.StopDate,
      PaidDate: data.PaidDate,
    };
    const createdBill = new this.billModel(dataToSave);
    return createdBill.save();
  }

  async payBill(billId: string, owner: number) {
    const bill = await this.billModel
      .findOne({ _id: billId, Owner: owner })
      .exec();
    if (!bill) {
      return;
    }
    const billHistoryItem = new this.billHistoryItemModel({
      Bill: billId,
      Sum: bill.Sum,
      Description: bill.Description,
      Owner: owner,
    });
    return billHistoryItem.save();
    // bill.Active = false;
    // bill.save();
  }

  async deleteBill(id: string, owner: number) {
    await this.billHistoryItemModel
      .deleteMany({ Bill: id, Owner: owner })
      .exec();
    return this.billModel.deleteOne({ _id: id, Owner: owner }).exec();
  }
}
