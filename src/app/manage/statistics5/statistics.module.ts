import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { StatisticsAddComponent } from './statistics-add/statistics-add.component';
import { StatisticsUpdateComponent } from './statistics-update/statistics-update.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/pagination/pagination.module';


@NgModule({
  declarations: [StatisticsComponent, StatisticsListComponent, StatisticsAddComponent, StatisticsUpdateComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class Statistics5Module { }
