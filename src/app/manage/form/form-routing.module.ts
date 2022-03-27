import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAddComponent } from './form-add/form-add.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormUpdateComponent } from './form-update/form-update.component';
import { FormComponent } from './form.component';


const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:FormListComponent},
      {path:"Add",component:FormAddComponent},
      {path:"Update/:id",component:FormUpdateComponent},
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
