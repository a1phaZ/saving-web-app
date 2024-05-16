import { EIconName, TListItem } from '@tg-web-app/ui';
import {
  ETransactionCashFlow,
  ETransactionType,
} from './transaction.type.enum';

export interface ITransaction {
  Id: string;
  Type: string; // Внешнее/внутреннее
  Cashflow: ETransactionCashFlow; // Направление движения ден. средств
  Source: string;
  Target: string;
  Amount: number;
  Owner: number;
  Description: string;
  Timestamp: number;
}

export class Transaction implements ITransaction {
  private _id!: string;
  public get Id(): string {
    return this._id;
  }
  public set Id(value: string) {
    this._id = value;
  }
  private _type!: string;
  public get Type(): string {
    return this._type;
  }
  public set Type(value: string) {
    this._type = value;
  }
  private _cashflow!: ETransactionCashFlow;
  public get Cashflow(): ETransactionCashFlow {
    return this._cashflow;
  }
  public set Cashflow(value: ETransactionCashFlow) {
    this._cashflow = value;
  }
  private _source!: string;
  public get Source(): string {
    return this._source;
  }
  public set Source(value: string) {
    this._source = value;
  }
  private _target!: string;
  public get Target(): string {
    return this._target;
  }
  public set Target(value: string) {
    this._target = value;
  }
  private _amount!: number;
  public get Amount(): number {
    return this._amount;
  }
  public set Amount(value: number) {
    this._amount = value;
  }
  private _owner!: number;
  public get Owner(): number {
    return this._owner;
  }
  public set Owner(value: number) {
    this._owner = value;
  }
  private _description!: string;
  public get Description(): string {
    return this._description;
  }
  public set Description(value: string) {
    this._description = value;
  }
  private _timestamp!: number;
  public get Timestamp(): number {
    return this._timestamp;
  }
  public set Timestamp(value: number) {
    this._timestamp = value;
  }

  constructor(params: ITransaction) {
    this.Id = params.Id;
    this.Type = params.Type;
    this.Cashflow = params.Cashflow;
    this.Source = params.Source;
    this.Target = params.Target;
    this.Amount = params.Amount;
    this.Owner = params.Owner;
    this.Description = params.Description;
    this.Timestamp = params.Timestamp;
  }

  public get ListItem(): TListItem {
    return {
      id: this.Id,
      title: this._getListItemTitle(),
      type: 'wallet',
      icon: {
        name: EIconName.saxArrangeCircle2Outline,
        size: '32px',
      },
      additional: this.Amount,
      subtitle: this.Description,
    };
  }

  private _getListItemTitle(): string {
    if (this.Type === ETransactionType.TRANSFER) {
      return 'Перевод средств между кошельками';
    }
    if (this.Type === ETransactionType.INCOME) {
      return 'Пополнение кошелька';
    }
    if (this.Type === ETransactionType.EXPENSE) {
      return 'Списание с кошелька';
    }
    return `${this.Source} -> ${this.Target}`;
  }
}
