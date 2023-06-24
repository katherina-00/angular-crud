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
  branches: any = []
  categories: any[] = [];
  selectedCategoryId: number = 0;
  selectedBranchId: number =0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { 
    this.products = [];
    this.categories = [];
    this.branches = [];
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getBranches();

    this.route.params.subscribe(params => {
      const categoryId = params["id"];
      const branchId = params["id"];
      if (categoryId || branchId) {
        this.filterProductsBy();
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
  filterProductsBy() {
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
    } else if (this.selectedBranchId) {
      this.productService.filterProductsByBranch(this.selectedBranchId).subscribe({
        next: (response) => {
          console.log(response);
          this.products = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
    else {
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
  getBranches(): void {
    this.productService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
