import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { CrudStandComponent } from './crud-stand';
import { DetailStandComponent } from './detail-stand';

const standRoutes: Routes = [
  { path: 'stands', component: CrudStandComponent, canActivate: [AuthGuard] },
  { path: 'stands/:id', component: DetailStandComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(standRoutes)
  ],
  exports: [RouterModule]
})
export class StandRoutingModule { }
