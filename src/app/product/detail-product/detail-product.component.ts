import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail, ProductService } from '../services';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  product!: ProductDetail;

  loading = true;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getStand();
  }

  public getStand(): void {
    const productId = this.route.snapshot.params.id;
    this.productService.getProduct(productId).subscribe({
      next: (product: ProductDetail) => {
        this.product = product;
        this.loading = false;
      },
    });
  }

  public normalizedProductMeasurementUnit(
    productDetail: ProductDetail,
    stock: number
  ): string | undefined {
    if (stock == 1) {
      return productDetail.measurement_unit?.name?.toLowerCase();
    } else {
      return `${productDetail.measurement_unit?.name}s`.toLowerCase();
    }
  }
}
