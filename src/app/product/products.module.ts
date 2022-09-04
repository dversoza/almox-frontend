import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudProductComponent } from './crud-product/crud-product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { MeasurementUnitService, ProductService } from './services';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CrudProductComponent, ModalProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  providers: [ProductService, MeasurementUnitService],
})
export class ProductModule { }
