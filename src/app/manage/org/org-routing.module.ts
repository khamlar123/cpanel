import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgListComponent } from './org-list/org-list.component';
import { OrgUpdateComponent } from './org-update/org-update.component';
import { OrgComponent } from './org.component';


const routes: Routes = [
  {
    path: '',
    component: OrgComponent,
    children: [
      { path: '', redirectTo: 'List', pathMatch: 'full' },
      { path: 'List', component: OrgListComponent },
      { path: 'Add', component: OrgAddComponent },
      { path: 'Update/:id', component: OrgUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
