import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/guards/first-load-check.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'balance',
        loadComponent: () =>
          import('../balance/balance.page').then((m) => m.BalancePage),
          canActivate: [AuthGuard]
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: 'add-transaction',
        loadComponent: () =>
          import('../add-transaction/add-transaction.page').then((m) => m.AddTransactionPage),
      },
      {
        path: '',
        redirectTo: '/tabs/balance',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/balance',
    pathMatch: 'full',
  },
];
