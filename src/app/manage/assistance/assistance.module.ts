import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistanceRoutingModule } from './assistance-routing.module';
import { AssistanceComponent } from './assistance.component';
import { AssistanceListComponent } from './assistance-list/assistance-list.component';
import { AssistanceAddComponent } from './assistance-add/assistance-add.component';
import { AssistanceUpdateComponent } from './assistance-update/assistance-update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AssistanceComponent, AssistanceListComponent, AssistanceAddComponent, AssistanceUpdateComponent],
  imports: [
    CommonModule,
    AssistanceRoutingModule,
    FormsModule
  ]
})
export class AssistanceModule { }
