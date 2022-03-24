import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactComponent } from './contact.component';


const routes: Routes = [
  {
     
    path:"",
    component: ContactComponent,
    children:[
      {path:"",redirectTo:"List",pathMatch:"full"},
      {path:"List",component:ContactListComponent},
      {path:"Add",component:ContactAddComponent},
      {path:"Update/:id",component:ContactUpdateComponent},
     
    ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
