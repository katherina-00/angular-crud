import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  category: any[] = [];
  branch: any[] = [];
  productId : any;
  productData: any = {
    title: '',
    price: '',
    brand: '',
    categoryId: null,
    branchId: null
  };
  error: string = "";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBranches();
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductData();
    });
  }

  loadProductData() {
    this.productService.getProductById(this.productId)
      .subscribe(
        response => {
          this.productData = response;
          this.productData.categoryId = response.category && response.category.id;
          console.log(response.category); // Verificar el contenido del campo genre
          console.log(this.productData.categoryId); // Verificar el valor asignado a genreId
        },
        error => {
          this.error = 'Error al cargar los datos de la película';
          console.error(error);
        }
      );
  }
  updateProduct() {
    this.productService.updateProduct(this.productId, this.productData).subscribe({
        next: () => {
          // Lógica después de una actualización exitosa
          this.router.navigate(['/products', this.productId]);
        },
        error: error => {
          this.error = 'Error al actualizar la película';
          console.error(error);
        }
      });
  
    }
  
    getCategories(): void {
      this.productService.getCategory().subscribe({
        next: (category) => {
          this.category = category;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    getBranches(): void {
      this.productService.getBranches().subscribe({
        next: (branch) => {
          this.branch = branch;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

}
