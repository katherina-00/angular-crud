import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: String): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(id: String, product: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, product);
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  getCategory(): Observable<any[]> {
    const url = `http://localhost:8000/categories`;
    return this.http.get<any[]>(url);
  }

  filterProductsByCategory(categoryId: number) {
    const url = `http://localhost:8000/productsBy/${categoryId}`;
    return this.http.get<any[]>(url);
}
}
