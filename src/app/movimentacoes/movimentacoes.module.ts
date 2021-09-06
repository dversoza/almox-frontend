import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudMovimentacaoComponent } from './crud-movimentacao';
import { ModalMovimentacaoComponent } from './modal-movimentacao/modal-movimentacao.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { MovimentacaoService } from './services';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [CrudMovimentacaoComponent, ModalMovimentacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [MovimentacaoService],
})
export class MovimentacoesModule {}
