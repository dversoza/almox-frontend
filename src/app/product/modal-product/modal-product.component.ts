import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product.model';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { ProductService, MeasurementUnitService } from '../services';
import { HttpErrorResponse } from '@angular/common/http';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
})
export class ModalProductComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  product!: Product;
  measurementUnits!: MeasurementUnit[];
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private measurementUnitService: MeasurementUnitService
  ) { }

  ngOnInit(): void {
    if (!this.product) {
      this.product = new Product();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
    this.findMeasurementUnits();
  }

  public findMeasurementUnits(measurementUnitName: string = ''): void {
    this.measurementUnitService.findAllMeasurementUnits({
      params: {
        query: measurementUnitName,
      }
    }).subscribe({
      next: (measurementUnits: MeasurementUnit[]) => {
        this.measurementUnits = measurementUnits;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public submitForm() {
    if (this.productForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.productService.createProduct(this.product).subscribe({
          next: (product: Product) => {
            this.activeModal.close();
            parent.location.reload();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
            parent.location.reload();
          }
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: (product: Product) => {
            this.activeModal.close();
            parent.location.reload();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
            parent.location.reload();
          }
        });
      }
    }
  }
}
