import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudMeasurementUnitComponent } from './crud-measurement-unit/crud-measurement-unit.component';
import { ModalMeasurementUnitComponent } from './modal-measurement-unit/modal-measurement-unit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MeasurementUnitService } from './services';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CrudMeasurementUnitComponent, ModalMeasurementUnitComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [MeasurementUnitService],
})
export class MeasurementUnitModule { }
