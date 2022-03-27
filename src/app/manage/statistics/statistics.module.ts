import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { StatisticsAddComponent } from './statistics-add/statistics-add.component';
import { StatisticsUpdateComponent } from './statistics-update/statistics-update.component';


@NgModule({
  declarations: [StatisticsComponent, StatisticsListComponent, StatisticsAddComponent, StatisticsUpdateComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
