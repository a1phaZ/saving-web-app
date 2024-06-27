import { Bill, IBill } from '@tg-web-app/entity';

export enum EBillActions {
  BILL_GET = '[BILL] Get all',
  BILL_GET_SUCCESS = '[BILL] Get all success',
  BILL_GET_FAIL = '[BILL] Get all fail',
  BILL_ADD = '[BILL] Add',
  BILL_ADD_SUCCESS = '[BILL] Add success',
  BILL_ADD_FAIL = '[BILL] Add fail',
}

export class BillGet {
  static readonly type = EBillActions.BILL_GET;
}

export class BillGetSuccess {
  static readonly type = EBillActions.BILL_GET_SUCCESS;
  constructor(public payload: Bill[]) {}
}

export class BillGetFail {
  static readonly type = EBillActions.BILL_GET_FAIL;
  constructor(public error: Error) {}
}

export class BillAdd {
  static readonly type = EBillActions.BILL_ADD;
  constructor(public payload: Partial<IBill>) {}
}

export class BillAddSuccess {
  static readonly type = EBillActions.BILL_ADD_SUCCESS;
  constructor(public payload: Bill) {}
}

export class BillAddFail {
  static readonly type = EBillActions.BILL_ADD_FAIL;
  constructor(public error: Error) {}
}
