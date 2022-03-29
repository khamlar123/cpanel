import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentPlanRoutingModule } from './development-plan-routing.module';
import { DevelopmentListComponent } from './development-list/development-list.component';
import { DevelopmentAddComponent } from './development-add/development-add.component';
import { DevelopmentUpdateComponent } from './development-update/development-update.component';
import { DevelopmentPlanComponent } from './development-plan.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DevelopmentListComponent, DevelopmentAddComponent, DevelopmentUpdateComponent, DevelopmentPlanComponent],
  imports: [
    CommonModule,
    DevelopmentPlanRoutingModule,
    FormsModule
  ]
})
export class DevelopmentReportModule { }
