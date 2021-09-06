import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudPessoaComponent } from './crud-pessoa';
import { RouterModule } from '@angular/router';
import { PessoaService } from './services/pessoa.service';
import { ModalPessoaComponent } from './modal-pessoa/modal-pessoa.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CrudPessoaComponent, ModalPessoaComponent],
  imports: [CommonModule, RouterModule, FormsModule, NgSelectModule],
  providers: [PessoaService],
})
export class PessoasModule {}
