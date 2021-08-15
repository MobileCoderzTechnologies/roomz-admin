import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CHANGE_PASSWORD_ROUTE, DASHBOARD_ROUTE, FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, PROPERTY_ROUTE, USER_ROUTE } from './constants/route.constants';
import { ContainerComponent } from './container/container.component';
import { AuthGuard } from './guards/auth.guard';
import { ProtectGuard } from './guards/protect.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: DASHBOARD_ROUTE.path,
        pathMatch: 'full'
      },
      {
        path: DASHBOARD_ROUTE.path,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: USER_ROUTE.path,
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: PROPERTY_ROUTE.path,
        loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule)
      },
      {
        path: CHANGE_PASSWORD_ROUTE.path,
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: LOGIN_ROUTE.path,
    component: LoginComponent,
    canActivate: [ProtectGuard]
  },
  {
    path: FORGOT_PASSWORD_ROUTE.path,
    component: ForgotPasswordComponent,
    canActivate: [ProtectGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
