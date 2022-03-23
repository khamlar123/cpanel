import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepamentAddComponent } from './depament-add/depament-add.component';
import { DepamentInfoComponent } from './depament-info.component';
import { DepamentListComponent } from './depament-list/depament-list.component';
import { DepamentUpdateComponent } from './depament-update/depament-update.component';


const routes: Routes = [
  {
    path: '',
    component: DepamentInfoComponent,
    children: [
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:DepamentListComponent},
      {path:"Add",component:DepamentAddComponent},
      {path:"Update/:id",component:DepamentUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepamentInfoRoutingModule { }
