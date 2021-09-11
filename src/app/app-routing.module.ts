import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { CrudBarracaComponent } from './barracas';
import { HomepageComponent } from './homepage/homepage.component';
import { CrudMovimentacaoComponent } from './movimentacoes';
import { CrudPessoaComponent } from './pessoas';
import { CrudProdutoComponent } from './produtos/crud-produto';
import { CrudUnidadeMedidaComponent } from './ums/crud-unidade-medida';

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
    path: 'barracas',
    children: [{ path: '', component: CrudBarracaComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
    },
  },
  {
    path: 'movimentacoes',
    children: [{ path: '', component: CrudMovimentacaoComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN, COMUM',
    },
  },
  {
    path: 'pessoas',
    children: [{ path: '', component: CrudPessoaComponent }],
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,COMUM',
    },
  },
  {
    path: 'produtos',
    children: [
      { path: '', component: CrudProdutoComponent },
      { path: 'ums', component: CrudUnidadeMedidaComponent },
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
export class AppRoutingModule {}
