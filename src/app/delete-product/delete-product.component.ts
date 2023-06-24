import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  productId: any;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    if (this.productId) {
      this.productService.deleteProduct(this.productId).subscribe(
        () => {
          // Aquí puedes realizar alguna acción después de eliminar la película, como mostrar una notificación o redireccionar a otra página.
          console.log('Producto eliminado exitosamente');
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
