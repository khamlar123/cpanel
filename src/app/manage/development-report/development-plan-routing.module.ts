import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopmentAddComponent } from './development-add/development-add.component';
import { DevelopmentListComponent } from './development-list/development-list.component';
import { DevelopmentPlanComponent } from './development-plan.component';
import { DevelopmentUpdateComponent } from './development-update/development-update.component';


const routes: Routes = [
  {
     
    path:"",
    component: DevelopmentPlanComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:DevelopmentListComponent},
      {path:"Add",component:DevelopmentAddComponent},
      {path:"Update/:id",component:DevelopmentUpdateComponent},
     
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentPlanRoutingModule { }
