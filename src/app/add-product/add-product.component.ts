import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: any[] = [];
  branches: any[] = [];
  product: any = {
    title: '',
    price: '',
    brand: '',
    categoryId: null,
    branchId: null
  };
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBranches();
  }

  addProduct() {
    this.productService.createProduct(this.product).subscribe({
        next: (data) => {
          this.router.navigate(['/products'])
          this.product = data;
          console.log('Producto agregad0:', data);
        },
        error: (e) => console.error(e)
      });
  }

  getCategories(): void {
    this.productService.getCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log(this.categories);
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
        console.log(this.branches);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
