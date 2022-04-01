import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [ContactComponent, ContactListComponent, ContactAddComponent, ContactUpdateComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class ContactModule { }
