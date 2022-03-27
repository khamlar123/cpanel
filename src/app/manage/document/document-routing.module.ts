import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentUpdateComponent } from './document-update/document-update.component';


const routes: Routes = [
  {
    path:"",
    component: Document,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:DocumentListComponent},
      {path:"Add",component:DocumentAddComponent},
      {path:"Update/:id",component:DocumentUpdateComponent},
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
