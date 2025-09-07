import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  }
];
