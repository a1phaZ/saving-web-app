import { InjectionToken, Provider } from '@angular/core';
import { TListItem } from '@tg-web-app/ui';

export const PERIODS = new InjectionToken('PERIODS');

export const PERIOD_LIST_ITEMS = new InjectionToken<TListItem[]>(
  'PERIOD_LIST_ITEMS'
);

export enum EPeriods {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  // CUSTOM = 'custom',
}

export const periodsProvider: Provider[] = [
  {
    provide: PERIODS,
    useValue: EPeriods,
  },
  {
    provide: PERIOD_LIST_ITEMS,
    useFactory: () => {
      return Object.values(EPeriods).map((item) => ({
        id: item,
        type: 'wallet',
        titleCode: `period.${item}`,
        icon: {
          name: 'sax-bill-outline',
          size: '24px',
        },
      }));
    },
  },
];
