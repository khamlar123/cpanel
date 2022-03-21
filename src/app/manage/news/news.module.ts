import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { NewsListComponent } from './news-list/news-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewsComponent, NewsAddComponent, NewsUpdateComponent,NewsListComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule
  ]
})
export class NewsModule { }
