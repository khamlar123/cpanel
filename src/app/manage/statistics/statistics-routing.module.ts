import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsAddComponent } from './statistics-add/statistics-add.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { StatisticsUpdateComponent } from './statistics-update/statistics-update.component';
import { StatisticsComponent } from './statistics.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      { path: '', redirectTo: 'List', pathMatch: 'full' },
      { path: 'List', component: StatisticsListComponent },
      { path: 'Add', component: StatisticsAddComponent },
      { path: 'Update/:id', component: StatisticsUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
