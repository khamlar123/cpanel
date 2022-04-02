import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorAddComponent } from './donor-add/donor-add.component';
import { DonorUpdateComponent } from './donor-update/donor-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [DonorComponent, DonorListComponent, DonorAddComponent, DonorUpdateComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class DonorModule { }
