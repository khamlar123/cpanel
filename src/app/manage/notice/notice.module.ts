import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeUpdateComponent } from './notice-update/notice-update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NoticeComponent, NoticeListComponent, NoticeAddComponent, NoticeUpdateComponent],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    FormsModule
  ]
})
export class NoticeModule { }
