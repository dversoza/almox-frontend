import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { CrudStandComponent } from './stand';
import { HomepageComponent } from './homepage/homepage.component';
import { CrudTransactionComponent } from './transaction';
import { CrudPersonComponent } from './person';
import { CrudProductComponent } from './product/crud-product';
import { CrudMeasurementUnitComponent } from './measurement-unit/crud-measurement-unit';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN, COMUM',
    },
  },
  {
    path: 'stands',
    children: [{ path: '', component: CrudStandComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
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
  {
    path: 'people',
    children: [{ path: '', component: CrudPersonComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,COMUM',
    },
  },
  {
    path: 'products',
    children: [
      { path: '', component: CrudProductComponent },
      { path: 'measurementUnits', component: CrudMeasurementUnitComponent },
    ],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
