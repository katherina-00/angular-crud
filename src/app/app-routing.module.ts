import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ListProductComponent },
  { path: 'productsBy/:id', component: ListProductComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/:id', component: DetailProductComponent },
  { path: 'products/update/:id', component: UpdateProductComponent },
  { path: 'products/delete/:id', component:  DeleteProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
