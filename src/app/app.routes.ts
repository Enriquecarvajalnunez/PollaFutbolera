import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'posiciones',
        loadComponent: () => import('./posiciones/posiciones.page').then((m) => m.PosicionesPage),
      },
      {
        path: 'admin',
        loadComponent: () => import('./admin/admin.page').then((m) => m.AdminPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
  {
    path: 'registrar-apuesta',
    loadComponent: () => import('./registrar-apuesta/registrar-apuesta.page').then( m => m.RegistrarApuestaPage)
  },
  {
    path: 'buscar-apuesta',
    loadComponent: () => import('./pages/buscar-apuesta/buscar-apuesta.page').then( m => m.BuscarApuestaPage)
  },
];
