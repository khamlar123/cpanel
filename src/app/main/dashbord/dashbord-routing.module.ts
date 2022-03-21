import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyListComponent } from './company-list/company-list.component';
import { DashbordComponent } from "./dashbord.component";
import { PostJobsListComponent } from "./post-jobs-list/post-jobs-list.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberApplyComponent } from "./member-apply/member-apply.component";
import { MemberApplyAceptedComponent } from "./member-apply-acepted/member-apply-acepted.component";
import { MemberApplyNotAceptedComponent } from "./member-apply-not-acepted/member-apply-not-acepted.component";


const routes: Routes = [
  {path:"",component:DashbordComponent},
  {path:"CompanyList",component:CompanyListComponent},
  {path:"MemberList",component:MemberListComponent},

  {path:"MemberApply",component:MemberApplyComponent},
  {path:"Member-Apply-acepted",component:MemberApplyAceptedComponent},
  {path:"Member-Apply-No-acepted",component:MemberApplyNotAceptedComponent},
  {path:"PostJobsList",component:PostJobsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
