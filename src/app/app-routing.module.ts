import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { CrudTransactionComponent } from './transaction';
import { CrudPersonComponent } from './person';

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN, COMUM',
    },
  },
  {
    path: 'transactions',
    children: [{ path: '', component: CrudTransactionComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN, COMUM',
    },
  },
  { path: 'stands', redirectTo: 'stands', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products', redirectTo: 'products', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'people',
    children: [{ path: '', component: CrudPersonComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,COMUM',
    },
  },
  ...LoginRoutes,
  {
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN, COMUM',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
