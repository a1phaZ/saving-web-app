import { EIconName } from './icon-name.enum';

export type TActionButton = {
  id: number;
  size: string;
  icon: EIconName;
  title: string;
  action: {
    path: string;
    data?: any;
  };
  disabled?: boolean;
};
