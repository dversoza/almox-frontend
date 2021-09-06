import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudUnidadeMedidaComponent } from './crud-unidade-medida/crud-unidade-medida.component';
import { ModalUnidadeMedidaComponent } from './modal-unidade-medida/modal-unidade-medida.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UnidadeMedidaService } from './services';

@NgModule({
  declarations: [CrudUnidadeMedidaComponent, ModalUnidadeMedidaComponent],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [UnidadeMedidaService],
})
export class UmsModule {}
