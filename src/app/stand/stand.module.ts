import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';
import { CrudStandComponent } from './crud-stand';
import { DetailStandComponent } from './detail-stand/detail-stand.component';
import { ModalStandComponent } from './modal-stand/modal-stand.component';
import { StandService } from './services/stand.service';
import { StandRoutingModule } from './stand-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    StandRoutingModule,
  ],
  declarations: [CrudStandComponent, ModalStandComponent, DetailStandComponent],
  providers: [StandService],
})
export class StandModule { }
