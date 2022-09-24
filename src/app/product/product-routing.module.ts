import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { CrudProductComponent } from './crud-product';
import { DetailProductComponent } from './detail-product';

const standRoutes: Routes = [
  { path: 'products', component: CrudProductComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: DetailProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(standRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
