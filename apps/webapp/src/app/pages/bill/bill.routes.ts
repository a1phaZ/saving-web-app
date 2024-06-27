import { Route } from '@angular/router';

export const billRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./bill.component').then((m) => m.BillComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./bill-add/bill-add.component').then((m) => m.BillAddComponent),
  },
];
