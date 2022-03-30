import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorAddComponent } from './donor-add/donor-add.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorUpdateComponent } from './donor-update/donor-update.component';
import { DonorComponent } from './donor.component';


const routes: Routes = [
  {
     
    path:"",
    component: DonorComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:DonorListComponent},
      {path:"Add",component:DonorAddComponent},
      {path:"Update/:id",component:DonorUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
