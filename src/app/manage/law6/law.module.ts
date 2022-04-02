import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawRoutingModule } from './law-routing.module';
import { LawComponent } from './law.component';
import { LawListComponent } from './law-list/law-list.component';
import { LawAddComponent } from './law-add/law-add.component';
import { LawUpdateComponent } from './law-update/law-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [LawComponent, LawListComponent, LawAddComponent, LawUpdateComponent],
  imports: [
    CommonModule,
    LawRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class Law6Module { }
