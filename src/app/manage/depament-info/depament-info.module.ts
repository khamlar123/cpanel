import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepamentInfoRoutingModule } from './depament-info-routing.module';
import { DepamentInfoComponent } from './depament-info.component';
import { DepamentListComponent } from './depament-list/depament-list.component';
import { DepamentAddComponent } from './depament-add/depament-add.component';
import { DepamentUpdateComponent } from './depament-update/depament-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [DepamentInfoComponent, DepamentListComponent, DepamentAddComponent, DepamentUpdateComponent],
  imports: [
    CommonModule,
    DepamentInfoRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class DepamentInfoModule { }
