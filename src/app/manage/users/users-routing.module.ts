import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserRemoveComponent } from './user-remove/user-remove.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', redirectTo: 'List', pathMatch: 'full' },
      { path: 'List', component: UserListComponent },
      { path: 'Add', component: UserAddComponent },
      { path: 'Update', component: UserUpdateComponent },
      { path: 'Remove', component: UserRemoveComponent }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
