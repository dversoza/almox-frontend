import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product.model';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { MeasurementUnitService } from 'src/app/measurement-unit/services';
import { ProductService } from '../services';

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
  ums!: MeasurementUnit[];
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private umService: MeasurementUnitService
  ) { }

  ngOnInit(): void {
    if (!this.product) {
      this.product = new Product();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
    this.findAllUMs();
  }

  public findAllUMs() {
    this.umService.findAllMeasurementUnits().subscribe((ums: MeasurementUnit[]) => {
      this.ums = ums;
    });
  }

  public submitForm() {
    if (this.productForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.productService.addProduct(this.product).subscribe(
          () => {
            this.activeModal.close();
            parent.location.reload();
          },
          (error) => {
            alert(error.message);
          }
        );
      } else {
        this.productService.updateProduct(this.product).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      }
    }
  }
}
