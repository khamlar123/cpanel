import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VdioRoutingModule } from './vdio-routing.module';
import { VdioListComponent } from './vdio-list/vdio-list.component';
import { VdioAddComponent } from './vdio-add/vdio-add.component';
import { VdioUpdateComponent } from './vdio-update/vdio-update.component';
import { VdioComponent } from './vdio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [VdioListComponent, VdioAddComponent, VdioUpdateComponent, VdioComponent],
  imports: [
    CommonModule,
    VdioRoutingModule,
    FormsModule
  ]
})
export class VdioModule { }
