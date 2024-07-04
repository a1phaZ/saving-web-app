import { TIcon } from './icon.type';
import { TListAction } from './list-action.type';
import { TListWallet } from './list-wallet.type';

export type TListItem =
  | TListAction
  | TListWallet
  | {
      id: string;
      title?: string;
      titleCode?: string;
      subtitle?: string;
      type: 'item';
      icon: TIcon;
      additional?: string | number;
    };
