import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'view-transaction/:id',
    loadComponent: () => import('./view-transaction/view-transaction.page').then( m => m.ViewTransactionPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'lost-password',
    loadComponent: () => import('./lost-password/lost-password.page').then( m => m.LostPasswordPage)
  },  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'help-about',
    loadComponent: () => import('./help-about/help-about.page').then( m => m.HelpAboutPage)
  }

];
