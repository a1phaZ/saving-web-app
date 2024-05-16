import { IOperation } from '../operation';
import { EIconName, TListItem } from '@tg-web-app/ui';

export interface IWallet {
  Id: string;
  Title: string;
  Balance: number;
  Active: boolean;
  Owner: number;
  Description: string;
}

export interface IWalletWithOperations extends IWallet {
  Operations: IOperation[];
}

export class Wallet implements IWallet {
  private _id!: string;
  private _title!: string;
  private _balance!: number;
  private _active!: boolean;
  private _owner!: number;
  private _description!: string;

  constructor(params: IWallet) {
    this.Id = params.Id;
    this.Title = params.Title;
    this.Description = params.Description;
    this.Balance = params.Balance;
    this.Active = params.Active;
    this.Owner = params.Owner;
  }

  public get Id(): string {
    return this._id;
  }

  public set Id(value: string) {
    this._id = value;
  }

  public get Title(): string {
    return this._title;
  }

  public set Title(value: string) {
    this._title = value;
  }

  public get Balance(): number {
    return this._balance;
  }

  public set Balance(value: number) {
    this._balance = value;
  }

  public get Active(): boolean {
    return this._active;
  }

  public set Active(value: boolean) {
    this._active = value;
  }

  public get Owner(): number {
    return this._owner;
  }

  public set Owner(value: number) {
    this._owner = value;
  }

  public get Description(): string {
    return this._description;
  }

  public set Description(value: string) {
    this._description = value;
  }

  public get ListItem(): TListItem {
    return {
      id: this.Id,
      title: this.Title,
      type: 'wallet',
      icon: {
        name: EIconName.saxWallet1Outline,
        size: '32px',
      },
      additional: this.Balance,
      subtitle: this.Description,
    };
  }
}
