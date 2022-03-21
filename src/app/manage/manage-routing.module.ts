import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';


const routes: Routes = [
 
  { path:'',component:ManageComponent,
    children:[
      { path:'',redirectTo:"POS",pathMatch:"full"},
      { path:'Product',loadChildren: ()=> import('./product/product.module').then(m=>m.ProductModule)},
      { path:'Category',loadChildren: ()=> import('./category/category.module').then(m=>m.CategoryModule)},
      { path:'Users',loadChildren: ()=> import('./users/users.module').then(m=>m.UsersModule)}
      
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
