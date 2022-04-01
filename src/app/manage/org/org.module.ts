import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRoutingModule } from './org-routing.module';
import { OrgComponent } from './org.component';
import { OrgListComponent } from './org-list/org-list.component';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgUpdateComponent } from './org-update/org-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [OrgComponent, OrgListComponent, OrgAddComponent, OrgUpdateComponent],
  imports: [
    CommonModule,
    OrgRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class OrgModule { }
