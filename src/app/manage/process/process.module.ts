import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessAddComponent } from './process-add/process-add.component';
import { ProcessUpdateComponent } from './process-update/process-update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProcessComponent, ProcessListComponent, ProcessAddComponent, ProcessUpdateComponent],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    FormsModule
  ]
})
export class ProcessModule { }
