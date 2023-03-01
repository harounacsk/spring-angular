import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: "nav", component: NavComponent, children: [
      { path: "", component: ProductsComponent },
      { path: "products", component: ProductsComponent },
      { path: "add", component: AddProductComponent },
      { path: "update", component: UpdateProductComponent }
    ]
  },
  {
    path: "", component: NavComponent, children: [
      { path: "", component: ProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
