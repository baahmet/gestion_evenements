import { RegisterComponent } from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {Routes} from '@angular/router';
import {DashboardAdminComponent} from './dashboard/admin/admin.component';
import {DashboardUserComponent} from './dashboard/user/user.component';

import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';
import {EventListComponent} from './user/event-list/event-list.component';
import {EventDetailsComponent} from './user/event-details/event-details.component';
import {MesInscriptionsComponent} from './user/mes-inscriptions/mes-inscriptions.component';
import {GestionEvenementsComponent} from './admin/gestion-evenements/gestion-evenements.component';
import {StatistiquesComponent} from './admin/statistiques/statistiques.component';
import {GestionUtilisateursComponent} from './admin/gestion-utilisateurs/gestion-utilisateurs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard/admin',
    component: DashboardAdminComponent,
    canActivate: [authGuard, roleGuard('admin')] //  Accès admin uniquement
  },

  {
    path: 'admin/events',
    component: GestionEvenementsComponent,
    canActivate: [authGuard, roleGuard('admin')]
  },

  {
    path: 'admin/statistiques',
    component: StatistiquesComponent,
    canActivate: [authGuard, roleGuard('admin')]
  },


  {
    path: 'admin/utilisateurs',
    component: GestionUtilisateursComponent,
    canActivate: [authGuard, roleGuard('admin')]
  },









  {
    path: 'dashboard/user',
    component: DashboardUserComponent,
    canActivate: [authGuard, roleGuard('utilisateur')] // ✅Accès utilisateur uniquement
  },


  {
    path: 'evenements', component: EventListComponent,
    canActivate: [authGuard, roleGuard('utilisateur')]
  },

  {
    path: 'evenements/:id', component: EventDetailsComponent,
    canActivate: [authGuard, roleGuard('utilisateur')]
  },

  {
    path: 'mes-inscriptions', component: MesInscriptionsComponent,
    canActivate: [authGuard, roleGuard('utilisateur')]
  },


  {
    path: 'calendrier',
    loadComponent: () => import('./pages/event-calendar/event-calendar.component')
      .then(m => m.EventCalendarComponent)
  }


];
