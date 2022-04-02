import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawAddComponent } from './law-add/law-add.component';
import { LawListComponent } from './law-list/law-list.component';
import { LawUpdateComponent } from './law-update/law-update.component';
import { LawComponent } from './law.component';


const routes: Routes = [
  {
    path: '',
    component: LawComponent,
    children: [
      { path: '', redirectTo: 'List', pathMatch: 'full' },
      { path: 'List', component: LawListComponent },
      { path: 'Add', component: LawAddComponent },
      { path: 'Update/:id', component: LawUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawRoutingModule { }
