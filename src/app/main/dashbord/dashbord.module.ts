import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import { ShareModule } from "../../share/share.module";
import { CompanyListComponent } from './company-list/company-list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberApplyComponent } from './member-apply/member-apply.component';
import { FormsModule } from '@angular/forms';
import { PostJobsListComponent } from './post-jobs-list/post-jobs-list.component';
import { MemberApplyAceptedComponent } from './member-apply-acepted/member-apply-acepted.component';
import { MemberApplyNotAceptedComponent } from './member-apply-not-acepted/member-apply-not-acepted.component';



@NgModule({
  declarations: [DashbordComponent, CompanyListComponent, MemberListComponent, MemberApplyComponent, PostJobsListComponent, MemberApplyAceptedComponent, MemberApplyNotAceptedComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    FormsModule,
    ShareModule
  ]
})
export class DashbordModule { }
