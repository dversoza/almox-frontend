import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudTransactionComponent } from './crud-transaction';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from './services';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [CrudTransactionComponent, ModalTransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [TransactionService],
})
export class TransactionModule { }
