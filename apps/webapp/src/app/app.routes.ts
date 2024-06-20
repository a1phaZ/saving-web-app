import { Route } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MoneyBoxComponent } from './pages/money-box/money-box.component';
import { HomeComponent } from './pages/home/home.component';
import { WalletAddComponent } from './pages/wallet-add/wallet-add.component';
import { WalletInfoComponent } from './pages/wallet-info/wallet-info.component';
import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: '', // TODO Redirect to 404 page
      },
    ],
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'moneybox',
    component: MoneyBoxComponent,
  },
  {
    path: 'wallet',
    children: [
      {
        path: 'add',
        component: WalletAddComponent,
      },
      {
        path: ':id',
        component: WalletInfoComponent,
      },
    ],
  },
  {
    path: 'transaction',
    children: [
      {
        path: 'add',
        component: TransactionAddComponent,
      },
      {
        path: 'income',
        loadComponent: () =>
          import(
            './pages/transaction-income/transaction-income.component'
          ).then((m) => m.TransactionIncomeComponent),
      },
      {
        path: 'expense',
        loadComponent: () =>
          import(
            './pages/transaction-expense/transaction-expense.component'
          ).then((m) => m.TransactionExpenseComponent),
      },
    ],
  },
  {
    path: '',
    component: RegistrationComponent,
    pathMatch: 'full',
  },
];
