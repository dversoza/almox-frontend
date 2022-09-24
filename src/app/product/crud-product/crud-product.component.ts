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

  public loading = true;
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
    }).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
      }
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
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.findAllProducts();
        }
      }
      );
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

  public normalizedProductMeasurementUnit(product: Product): string | undefined {
    if (product.stock == 1) {
      return product.measurement_unit?.name?.toLowerCase();
    } else {
      return `${product.measurement_unit?.name}s`.toLowerCase();
    }
  }
}
