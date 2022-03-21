import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { ShareModule } from "../share/share.module";
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgetComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class AuthModule { }
