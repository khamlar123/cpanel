import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserRemoveComponent } from './user-remove/user-remove.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, UserAddComponent, UserListComponent, UserUpdateComponent, UserRemoveComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
