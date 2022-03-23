import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitelinkRoutingModule } from './sitelink-routing.module';
import { SitelinkComponent } from './sitelink.component';
import { SitelinkListComponent } from './sitelink-list/sitelink-list.component';
import { SitelinkAddComponent } from './sitelink-add/sitelink-add.component';
import { SitelinkUpdateComponent } from './sitelink-update/sitelink-update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SitelinkComponent, SitelinkListComponent, SitelinkAddComponent, SitelinkUpdateComponent],
  imports: [
    CommonModule,
    SitelinkRoutingModule,
    FormsModule
  ]
})
export class SitelinkModule { }
