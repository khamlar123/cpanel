import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeUpdateComponent } from './notice-update/notice-update.component';
import { NoticeComponent } from './notice.component';


const routes: Routes = [
  {
     
    path:"",
    component: NoticeComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:NoticeListComponent},
      {path:"Add",component:NoticeAddComponent},
      {path:"Update/:id",component:NoticeUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
