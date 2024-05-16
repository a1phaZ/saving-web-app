import { IWallet, Wallet } from '@tg-web-app/entity';

export enum EWalletActions {
  WALLET_GET = '[WALLET] Get all',
  WALLET_GET_SUCCESS = '[WALLET] Get all success',
  WALLET_GET_FAIL = '[WALLET] Get all fail',
  WALLET_ADD = '[WALLET] Add',
  WALLET_ADD_SUCCESS = '[WALLET] Add success',
  WALLET_ADD_FAIL = '[WALLET] Add fail',
}

export class WalletGet {
  static readonly type = EWalletActions.WALLET_GET;
}

export class WalletGetSuccess {
  static readonly type = EWalletActions.WALLET_GET_SUCCESS;
  constructor(public list: Wallet[]) {}
}

export class WalletGetFail {
  static readonly type = EWalletActions.WALLET_GET_FAIL;
  constructor(public error: Error) {}
}

export class WalletAdd {
  static readonly type = EWalletActions.WALLET_ADD;
  constructor(public payload: Partial<IWallet>) {}
}

export class WalletAddSuccess {
  static readonly type = EWalletActions.WALLET_ADD_SUCCESS;
  constructor(public payload: Wallet) {}
}

export class WalletAddFail {
  static readonly type = EWalletActions.WALLET_ADD_FAIL;
  constructor(public error: Error) {}
}
