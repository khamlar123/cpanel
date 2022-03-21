import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductComponent } from './product.component';


const routes: Routes = [
  {
     
      path:"",
      component: ProductComponent,
      children:[
        {path:"",redirectTo:"List",pathMatch:"full"},
        {path:"List",component:ProductListComponent},
        {path:"Add",component:ProductAddComponent},
        {path:"Update/:id",component:ProductUpdateComponent},
       
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
