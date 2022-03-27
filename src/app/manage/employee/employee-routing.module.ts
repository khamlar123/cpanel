import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  {
    path:"",
    component: EmployeeComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:EmployeeListComponent},
      {path:"Add",component:EmployeeAddComponent},
      {path:"Update/:id",component:EmployeeUpdateComponent},
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
