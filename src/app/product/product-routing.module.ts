import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudProductComponent } from './crud-product';
import { DetailProductComponent } from './detail-product';

const standRoutes: Routes = [
  { path: 'products', component: CrudProductComponent },
  { path: 'products/:id', component: DetailProductComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(standRoutes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
