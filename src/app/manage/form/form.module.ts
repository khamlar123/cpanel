import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormAddComponent } from './form-add/form-add.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [FormComponent, FormListComponent, FormAddComponent, FormUpdateComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class FormModule { }
