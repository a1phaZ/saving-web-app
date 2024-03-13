import { Route } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MoneyBoxComponent } from './pages/money-box/money-box.component';

export const appRoutes: Route[] = [
    {
        path: 'history', component: HistoryComponent, pathMatch: 'full'
    },
    {
        path: 'feedback', component: FeedbackComponent,
    },
    {
        path: 'moneybox', component: MoneyBoxComponent,
    },
    {
        path: '', redirectTo: 'history', pathMatch: 'full'
    },
];
