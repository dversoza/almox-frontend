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

  private currentPage: number = 1;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllProducts();
  }

  public findAllProducts(query: string = ''): void {
    this.productService.getAllProducts({
      params: {
        page: this.currentPage,
        query,
      }
    }).subscribe((products: Product[]) => {
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

  public nextPage(): void {
    this.currentPage++;
    this.findAllProducts();
  }

  public previousPage(): void {
    this.currentPage--;
    this.findAllProducts();
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.products?.length == 10;
  }
}
