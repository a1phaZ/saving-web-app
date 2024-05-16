import { ITransaction, Transaction } from '@tg-web-app/entity';

export enum ETransactionAction {
  TRANSACTION_ADD = '[Transaction] Add',
  TRANSACTION_ADD_SUCCESS = '[Transaction] Add success',
  TRANSACTION_ADD_FAIL = '[Transaction] Add fail',

  TRANSACTION_GET = '[Transaction] Get',
  TRANSACTION_GET_SUCCESS = '[Transaction] Get success',
  TRANSACTION_GET_FAIL = '[Transaction] Get fail',

  TRANSACTION_GET_BY_WALLET = '[Transaction] Get by wallet',
  TRANSACTION_GET_BY_WALLET_SUCCESS = '[Transaction] Get by wallet success',
  TRANSACTION_GET_BY_WALLET_FAIL = '[Transaction] Get by wallet fail',

  EditTransaction = 'EditTransaction',
  RemoveTransaction = 'RemoveTransaction',
}

export class TransactionGet {
  static readonly type = ETransactionAction.TRANSACTION_GET;
}

export class TransactionGetSuccess {
  static readonly type = ETransactionAction.TRANSACTION_GET_SUCCESS;
  constructor(public list: Transaction[]) {}
}

export class TransactionGetFail {
  static readonly type = ETransactionAction.TRANSACTION_GET_FAIL;
  constructor(public error: Error) {}
}

export class TransactionGetByWallet {
  static readonly type = ETransactionAction.TRANSACTION_GET_BY_WALLET;
  constructor(public walletId: string) {}
}

export class TransactionGetByWalletSuccess {
  static readonly type = ETransactionAction.TRANSACTION_GET_BY_WALLET_SUCCESS;
  constructor(public list: Transaction[]) {}
}

export class TransactionGetByWalletFail {
  static readonly type = ETransactionAction.TRANSACTION_GET_BY_WALLET_FAIL;
  constructor(public error: Error) {}
}

export class TransactionAdd {
  static readonly type = ETransactionAction.TRANSACTION_ADD;
  constructor(public payload: Partial<ITransaction>) {}
}

export class TransactionAddSuccess {
  static readonly type = ETransactionAction.TRANSACTION_ADD_SUCCESS;
  constructor(public payload: Transaction) {}
}

export class TransactionAddFail {
  static readonly type = ETransactionAction.TRANSACTION_ADD_FAIL;
  constructor(public error: Error) {}
}
