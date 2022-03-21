import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main.component";



const routes: Routes = [
  { path:'',redirectTo:"Manage",pathMatch:"full"},
  { path:'Manage',loadChildren: ()=> import('../manage/manage.module').then(m=>m.ManageModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
