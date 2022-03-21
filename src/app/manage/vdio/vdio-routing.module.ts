import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VdioAddComponent } from './vdio-add/vdio-add.component';
import { VdioListComponent } from './vdio-list/vdio-list.component';
import { VdioUpdateComponent } from './vdio-update/vdio-update.component';
import { VdioComponent } from './vdio.component';


const routes: Routes = [
  {
     
    path:"",
    component: VdioComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:VdioListComponent},
      {path:"Add",component:VdioAddComponent},
      {path:"Update",component:VdioUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VdioRoutingModule { }
