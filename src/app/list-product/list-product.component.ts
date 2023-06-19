import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: any[];
  categories: any[] = [];
  selectedCategoryId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { 
    this.products = [];
    this.categories = [];
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();

    this.route.params.subscribe(params => {
      const categoryId = params["id"];
      console.log(categoryId);
      if (categoryId) {
        this.filterProductsByCategory();
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  filterProductsByCategory() {
    if (this.selectedCategoryId) {
      this.productService.filterProductsByCategory(this.selectedCategoryId).subscribe({
        next: (response) => {
          console.log(response);
          this.products = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.getProducts();
    }
  }
  

  getCategories(): void {
    this.productService.getCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
