export interface IBillHistoryItem {
  Id: string;
  Bill: any;
  Sum: number;
  Description: string;
  Owner: number;
}

export class BillHistoryItem implements IBillHistoryItem {
  private _id!: string;
  private _bill!: any;
  private _sum!: number;
  private _description!: string;
  private _owner!: number;

  constructor(params: IBillHistoryItem) {
    this.Id = params.Id;
    this.Bill = params.Bill;
    this.Sum = params.Sum;
    this.Description = params.Description;
    this.Owner = params.Owner;
  }

  public get Id(): string {
    return this._id;
  }

  public set Id(value: string) {
    this._id = value;
  }

  public get Bill(): any {
    return this._bill;
  }

  public set Bill(value: any) {
    this._bill = value;
  }

  public get Sum(): number {
    return this._sum;
  }

  public set Sum(value: number) {
    this._sum = value;
  }

  public get Description(): string {
    return this._description;
  }

  public set Description(value: string) {
    this._description = value;
  }

  public get Owner(): number {
    return this._owner;
  }

  public set Owner(value: number) {
    this._owner = value;
  }

  public get BillItem(): IBillHistoryItem {
    return {
      Id: this.Id,
      Bill: this.Bill,
      Sum: this.Sum,
      Description: this.Description,
      Owner: this.Owner,
    };
  }
}
