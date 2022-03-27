import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentUpdateComponent } from './document-update/document-update.component';


@NgModule({
  declarations: [DocumentComponent, DocumentListComponent, DocumentAddComponent, DocumentUpdateComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
