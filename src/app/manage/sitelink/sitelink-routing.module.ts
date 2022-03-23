import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitelinkAddComponent } from './sitelink-add/sitelink-add.component';
import { SitelinkListComponent } from './sitelink-list/sitelink-list.component';
import { SitelinkUpdateComponent } from './sitelink-update/sitelink-update.component';
import { SitelinkComponent } from './sitelink.component';


const routes: Routes = [
  {
    path: '',
    component: SitelinkComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:SitelinkListComponent},
      {path:"Add",component:SitelinkAddComponent},
      {path:"Update/:id",component:SitelinkUpdateComponent},
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitelinkRoutingModule { }
