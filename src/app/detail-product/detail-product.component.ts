import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params["id"];
      console.log(productId);
      this.getProductById(productId);
    });
  }

  getProductById(id: string): void { this.productService.getProductById(id).subscribe({
    next: (data) => {
      this.product = data;
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}

goToUpdateProduct(): void {
  this.router.navigate(['/products/update/', this.product.id]);
}
goToDeleteProduct(): void {
  if (this.product.id) {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        // Aquí puedes realizar alguna acción después de eliminar el producto, como mostrar una notificación o redireccionar a otra página.
        this.router.navigate(['/products/delete/', this.product.id])
      },
      error => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  } else {
    console.warn('Debes proporcionar un ID de producto');
  }
}

}
