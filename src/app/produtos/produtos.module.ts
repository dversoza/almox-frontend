import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import { ModalProdutoComponent } from './modal-produto/modal-produto.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService } from './services';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CrudProdutoComponent, ModalProdutoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  providers: [ProdutoService],
})
export class ProdutosModule {}
