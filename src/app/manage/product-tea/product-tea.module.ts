import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTeaRoutingModule } from './product-tea-routing.module';
import { ProductTeaComponent } from './product-tea.component';
import { ProductTeaListComponent } from './product-tea-list/product-tea-list.component';
import { ProductTeaAddComponent } from './product-tea-add/product-tea-add.component';
import { ProductTeaUpdateComponent } from './product-tea-update/product-tea-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [ProductTeaComponent, ProductTeaListComponent, ProductTeaAddComponent, ProductTeaUpdateComponent],
  imports: [
    CommonModule,
    ProductTeaRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class ProductTeaModule { }
