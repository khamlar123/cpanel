import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessAddComponent } from './process-add/process-add.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessUpdateComponent } from './process-update/process-update.component';
import { ProcessComponent } from './process.component';


const routes: Routes = [
  {
     
    path:"",
    component: ProcessComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:ProcessListComponent},
      {path:"Add",component:ProcessAddComponent},
      {path:"Update/:id",component:ProcessUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
