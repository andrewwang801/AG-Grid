import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';


const routes: Routes = [
  {path:'products',  component:ProductComponent},
  {path:'', component:ProductComponent},
  {path:'addProduct', component:AddProductComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
