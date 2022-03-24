import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/service/auth-guard.service';
import { ContactModule } from './contact/contact.module';
import { DepamentInfoModule } from './depament-info/depament-info.module';
import { ManageComponent } from './manage.component';
import { ProcessModule } from './process/process.module';
import { SitelinkUpdateComponent } from './sitelink/sitelink-update/sitelink-update.component';
import { SitelinkModule } from './sitelink/sitelink.module';


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
      { path:'Site',loadChildren: ()=> import('./sitelink/sitelink.module').then(m => SitelinkModule)},
      { path:'Depament',loadChildren: ()=> import('./depament-info/depament-info.module').then(m => DepamentInfoModule)},
      { path:'Contact',loadChildren: ()=> import('./contact/contact.module').then(m => ContactModule)},
      { path:'Process',loadChildren: ()=> import('./process/process.module').then(m => ProcessModule)},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
