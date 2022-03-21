import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

import {RouterModule} from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ChartCanvusjsComponent } from './chart-canvusjs/chart-canvusjs.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { TitelComponent } from './titel/titel.component';
import { FoodterComponent } from './foodter/foodter.component';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, UploadFileComponent, ChartCanvusjsComponent, UploadImageComponent, TitelComponent, FoodterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MenuComponent, 
    HeaderComponent,
    UploadFileComponent,
    UploadImageComponent,
    ChartCanvusjsComponent,
    TitelComponent,
    FoodterComponent
  ]
})
export class ShareModule { }
