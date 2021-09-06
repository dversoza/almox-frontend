import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarracaService } from './services/barraca.service';
import { CrudBarracaComponent } from './crud-barraca';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalBarracaComponent } from './modal-barraca/modal-barraca.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CrudBarracaComponent, ModalBarracaComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [BarracaService],
})
export class BarracasModule {}
