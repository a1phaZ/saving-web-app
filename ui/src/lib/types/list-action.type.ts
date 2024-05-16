import { TIcon } from './icon.type';

export type TListAction = {
  id: string;
  title: string;
  path: string;
  subtitle?: string;
  type: 'action';
  icon: TIcon;
  additional?: string;
};
