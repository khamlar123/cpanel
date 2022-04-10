import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouncilAddComponent } from './council-add/council-add.component';
import { CouncilListComponent } from './council-list/council-list.component';
import { CouncilUpdateComponent } from './council-update/council-update.component';
import { CouncilComponent } from './council.component';


const routes: Routes = [
  {
    path: '',
    component: CouncilComponent,
    children: [
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:CouncilListComponent},
      {path:"Add",component:CouncilAddComponent},
      {path:"Update/:id",component:CouncilUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouncilRoutingModule { }
