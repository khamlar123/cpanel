import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerUpdateComponent } from './banner-update/banner-update.component';
import { BannerComponent } from './banner.component';


const routes: Routes = [
  {
     
    path:"",
    component: BannerComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:BannerListComponent},
      {path:"Add",component:BannerAddComponent},
      {path:"Update/:id",component:BannerUpdateComponent},
     
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
