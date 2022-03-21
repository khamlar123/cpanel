import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/service/auth-guard.service';
import { ManageComponent } from './manage.component';


const routes: Routes = [
 
  { path:'',component:ManageComponent,
  canActivate: [AuthGuardService],
    children:[
      { path:'',redirectTo:"POS",pathMatch:"full"},
      { path:'Product',loadChildren: ()=> import('./product/product.module').then(m=>m.ProductModule)},
      { path:'Users',loadChildren: ()=> import('./users/users.module').then(m=>m.UsersModule)},
      { path:'Banner',loadChildren: ()=> import('./banner/banner.module').then(m=>m.BannerModule)},
      { path:'News',loadChildren: ()=> import('./news/news.module').then(m=>m.NewsModule)},
      { path:'Notice',loadChildren: ()=> import('./notice/notice.module').then(m=>m.NoticeModule)},
      { path:'Vdio',loadChildren: ()=> import('./vdio/vdio.module').then(m=>m.VdioModule)},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
