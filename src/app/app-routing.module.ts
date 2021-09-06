import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudBarracaComponent } from './barracas';
import { HomepageComponent } from './homepage/homepage.component';
import { CrudMovimentacaoComponent } from './movimentacoes';
import { CrudPessoaComponent } from './pessoas';
import { CrudProdutoComponent } from './produtos/crud-produto';
import { CrudUnidadeMedidaComponent } from './ums/crud-unidade-medida';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: HomepageComponent },
  {
    path: 'barracas',
    children: [{ path: '', component: CrudBarracaComponent }],
  },
  {
    path: 'movimentacoes',
    children: [{ path: '', component: CrudMovimentacaoComponent }],
  },
  {
    path: 'pessoas',
    children: [{ path: '', component: CrudPessoaComponent }],
  },
  {
    path: 'produtos',
    children: [
      { path: '', component: CrudProdutoComponent },
      { path: 'ums', component: CrudUnidadeMedidaComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
