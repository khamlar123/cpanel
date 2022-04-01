import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [EmployeeComponent, EmployeeAddComponent, EmployeeUpdateComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class EmployeeModule { }
