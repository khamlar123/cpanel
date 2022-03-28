import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductTeaAddComponent } from './product-tea-add/product-tea-add.component';
import { ProductTeaListComponent } from './product-tea-list/product-tea-list.component';
import { ProductTeaUpdateComponent } from './product-tea-update/product-tea-update.component';
import { ProductTeaComponent } from './product-tea.component';


const routes: Routes = [
  {
    path: '',
    component: ProductTeaComponent,
    children: [
      { path: '', redirectTo: 'List', pathMatch: 'full' },
      { path: 'List', component: ProductTeaListComponent },
      { path: 'Add', component: ProductTeaAddComponent },
      { path: 'Update/:id', component: ProductTeaUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTeaRoutingModule { }
