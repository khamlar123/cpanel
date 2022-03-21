import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { NewsComponent } from './news.component';


const routes: Routes = [
  {
     
    path:"",
    component: NewsComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:NewsListComponent},
      {path:"Add",component:NewsAddComponent},
      {path:"Update/:id",component:NewsUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
