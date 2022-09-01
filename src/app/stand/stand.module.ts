import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';
import { CrudStandComponent } from './crud-stand';
import { DetailStandComponent } from './detail-stand/detail-stand.component';
import { ModalStandComponent } from './modal-stand/modal-stand.component';
import { StandService } from './services/stand.service';

@NgModule({
  declarations: [CrudStandComponent, ModalStandComponent, DetailStandComponent],
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
