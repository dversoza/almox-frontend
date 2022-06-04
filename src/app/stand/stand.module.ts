import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandService } from './services/stand.service';
import { CrudStandComponent } from './crud-stand';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalStandComponent } from './modal-stand/modal-stand.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CrudStandComponent, ModalStandComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
  ],
  providers: [StandService],
})
export class StandModule { }
