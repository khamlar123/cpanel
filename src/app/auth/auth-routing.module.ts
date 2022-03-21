import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgetComponent } from './forget/forget.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path:'',redirectTo:"login",pathMatch:"full"},
  { path:'login',component:LoginComponent},
  { path:"register",component: RegisterComponent},
  { path:"forget",component: ForgetComponent},
  { path:"AdminLogin",component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
