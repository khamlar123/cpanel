import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerUpdateComponent } from './banner-update/banner-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [BannerComponent, BannerListComponent, BannerAddComponent, BannerUpdateComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class Banner2Module { }
