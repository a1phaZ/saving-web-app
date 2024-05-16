import { TIcon } from './icon.type';

export type TListWallet = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'wallet';
  icon: TIcon;
  additional?: number;
};
