import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from "./main.component";
import { ShareModule } from "../share/share.module";

import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule,
    FormsModule

  ]
})
export class MainModule { }
