import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentPlanRoutingModule } from './development-plan-routing.module';
import { DevelopmentListComponent } from './development-list/development-list.component';
import { DevelopmentAddComponent } from './development-add/development-add.component';
import { DevelopmentUpdateComponent } from './development-update/development-update.component';


@NgModule({
  declarations: [DevelopmentListComponent, DevelopmentAddComponent, DevelopmentUpdateComponent],
  imports: [
    CommonModule,
    DevelopmentPlanRoutingModule
  ]
})
export class DevelopmentPlanModule { }
