import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitelinkRoutingModule } from './sitelink-routing.module';
import { SitelinkComponent } from './sitelink.component';
import { SitelinkListComponent } from './sitelink-list/sitelink-list.component';
import { SitelinkAddComponent } from './sitelink-add/sitelink-add.component';
import { SitelinkUpdateComponent } from './sitelink-update/sitelink-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [SitelinkComponent, SitelinkListComponent, SitelinkAddComponent, SitelinkUpdateComponent],
  imports: [
    CommonModule,
    SitelinkRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class SitelinkModule { }
