import { EIconName, TListItem } from '@tg-web-app/ui';

export interface IBill {
  Id: string;
  Title: string;
  Sum: number;
  PaidDate: number;
  Period: number;
  StopDate: Date;
  Owner: number;
  Description: string;
  Active: boolean;
  Status: string; // TODO status model
}

export class Bill implements IBill {
  private _id!: string;
  private _title!: string;
  private _sum!: number;
  private _paidDate!: number;
  private _period!: number;
  private _stopDate!: Date;
  private _owner!: number;
  private _description!: string;
  private _active!: boolean;
  private _status!: string;

  constructor(params: IBill) {
    this.Id = params.Id;
    this.Title = params.Title;
    this.Sum = params.Sum;
    this.PaidDate = params.PaidDate;
    this.Period = params.Period;
    this.StopDate = params.StopDate;
    this.Owner = params.Owner;
    this.Description = params.Description;
    this.Active = params.Active;
    this.Status = params.Status;
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

  public get Sum(): number {
    return this._sum;
  }

  public set Sum(value: number) {
    this._sum = value;
  }

  public get PaidDate(): number {
    return this._paidDate;
  }

  public set PaidDate(value: number) {
    this._paidDate = value;
  }

  public get Period(): number {
    return this._period;
  }

  public set Period(value: number) {
    this._period = value;
  }

  public get StopDate(): Date {
    return this._stopDate;
  }

  public set StopDate(value: Date) {
    this._stopDate = value;
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

  public get Active(): boolean {
    return this._active;
  }

  public set Active(value: boolean) {
    this._active = value;
  }

  public get Status(): string {
    return this._status;
  }

  public set Status(value: string) {
    this._status = value;
  }

  public get Bill(): IBill {
    return {
      Id: this._id,
      Title: this._title,
      Sum: this._sum,
      PaidDate: this._paidDate,
      Period: this._period,
      StopDate: this._stopDate,
      Owner: this._owner,
      Description: this._description,
      Active: this._active,
      Status: this._status,
    };
  }

  public get ListItem(): TListItem {
    return {
      id: this.Id,
      title: this.Title,
      type: 'wallet',
      icon: {
        name: EIconName.saxBillOutline,
        size: '32px',
      },
      additional: this.Sum,
      subtitle: this.subtitle,
    };
  }

  private get subtitle(): string {
    const now = new Date();
    const day = now.getDate();
    const delta = this.PaidDate - day;
    if (delta === 0) {
      return 'Сегодня';
    }
    return delta > 0
      ? `Оплатить в течение ${delta} дня`
      : `Просрочено ${Math.abs(delta)} дней`;
  }
}
