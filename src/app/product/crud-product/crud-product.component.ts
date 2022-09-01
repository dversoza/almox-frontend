import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product.model';
import { ModalProductComponent } from '../modal-product';
import { ProductService } from '../services';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css'],
})
export class CrudProductComponent implements OnInit {
  public products!: Product[];

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllProducts();
  }

  public findAllProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public modalProduct(product?: Product): void {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.product = product;
  }

  public deleteProduct($event: any, product: Product) {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir o product ${product.name}?`) &&
      product.id
    ) {
      this.productService.deleteProduct(product.id).subscribe(
        () => { this.findAllProducts(); }),
        (error: HttpErrorResponse) => { alert(error.message) }
    }
  }

  public searchProduct(key: string): void {
    const results: Product[] = [];
    for (const product of this.products) {
      if (
        product?.name?.toLowerCase().includes(key.toLowerCase()) ||
        product?.description?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(product);
      }
    }
    if (key === '') {
      this.findAllProducts();
    }
    this.products = results;
  }
}
