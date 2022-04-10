import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouncilRoutingModule } from './council-routing.module';
import { CouncilComponent } from './council.component';
import { CouncilAddComponent } from './council-add/council-add.component';
import { CouncilUpdateComponent } from './council-update/council-update.component';
import { CouncilListComponent } from './council-list/council-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CouncilComponent, CouncilAddComponent, CouncilUpdateComponent, CouncilListComponent],
  imports: [
    CommonModule,
    CouncilRoutingModule,
    FormsModule
  ]
})
export class CouncilModule { }
