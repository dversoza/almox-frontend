import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudStandComponent } from './crud-stand';
import { DetailStandComponent } from './detail-stand';

const standRoutes: Routes = [
  { path: 'stands', component: CrudStandComponent },
  { path: 'stands/:id', component: DetailStandComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(standRoutes)
  ],
  exports: [RouterModule]
})
export class StandRoutingModule { }
