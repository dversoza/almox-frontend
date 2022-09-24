import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudProductComponent } from './crud-product';
import { ModalProductComponent } from './modal-product';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { MeasurementUnitService, ProductService } from './services';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { DetailProductComponent } from './detail-product';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [CrudProductComponent, ModalProductComponent, DetailProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ProductRoutingModule,
  ],
  providers: [ProductService, MeasurementUnitService],
})
export class ProductModule {}
