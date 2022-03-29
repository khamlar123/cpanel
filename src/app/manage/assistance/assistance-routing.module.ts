import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssistanceAddComponent } from './assistance-add/assistance-add.component';
import { AssistanceListComponent } from './assistance-list/assistance-list.component';
import { AssistanceUpdateComponent } from './assistance-update/assistance-update.component';
import { AssistanceComponent } from './assistance.component';


const routes: Routes = [
  {
     
    path:"",
    component: AssistanceComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:AssistanceListComponent},
      {path:"Add",component:AssistanceAddComponent},
      {path:"Update/:id",component:AssistanceUpdateComponent},
     
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistanceRoutingModule { }
