import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/service/auth-guard.service';
import { AssistanceModule } from './assistance/assistance.module';
import { ContactModule } from './contact/contact.module';
import { DepamentInfoModule } from './depament-info/depament-info.module';
import { DevelopmentPlanComponent } from './development-plan/development-plan.component';
import { DevelopmentPlanModule } from './development-plan/development-plan.module';
import { DevelopmentReportModule } from './development-report/development-plan.module';
import { DocumentModule } from './document/document.module';
import { DonorModule } from './donor/donor.module';
import { EmployeeModule } from './employee/employee.module';
import { FormModule } from './form/form.module';
import { LawModule } from './law/law.module';
import { ManageComponent } from './manage.component';
import { OrgModule } from './org/org.module';
import { Org1Module } from './org1/org.module';
import { Org2Module } from './org2/org.module';
import { ProcessModule } from './process/process.module';
import { ProductTeaModule } from './product-tea/product-tea.module';
import { SitelinkUpdateComponent } from './sitelink/sitelink-update/sitelink-update.component';
import { SitelinkModule } from './sitelink/sitelink.module';
import { StatisticsModule } from './statistics/statistics.module';


const routes: Routes = [

  {
    path: '', component: ManageComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'POS', pathMatch: 'full' },
      { path: 'Product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'Users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'Banner', loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule) },
      { path: 'News', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
      { path: 'Notice', loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule) },
      { path: 'Vdio', loadChildren: () => import('./vdio/vdio.module').then(m => m.VdioModule) },
      { path: 'Site', loadChildren: () => import('./sitelink/sitelink.module').then(m => SitelinkModule) },
      { path: 'Depament', loadChildren: () => import('./depament-info/depament-info.module').then(m => DepamentInfoModule) },
      { path: 'Contact', loadChildren: () => import('./contact/contact.module').then(m => ContactModule) },
      { path: 'Process', loadChildren: () => import('./process/process.module').then(m => ProcessModule) },
      { path: 'Employee', loadChildren: () => import('./employee/employee.module').then(m => EmployeeModule) },
      { path: 'Document', loadChildren: () => import('./document/document.module').then(m => DocumentModule) },
      { path: 'Form', loadChildren: () => import('./form/form.module').then(m => FormModule) },
      { path: 'ProductTea', loadChildren: () => import('./product-tea/product-tea.module').then(m => ProductTeaModule) },
      { path: 'Assistance', loadChildren: () => import('./assistance/assistance.module').then(m => AssistanceModule) },
      // tslint:disable-next-line:max-line-length
      { path: 'DevelopmentPlan', loadChildren: () => import('./development-plan/development-plan.module').then(() => DevelopmentPlanModule) },
      // tslint:disable-next-line:max-line-length
      { path: 'DevelopmentReport', loadChildren: () => import('./development-report/development-plan.module').then(() => DevelopmentReportModule) },
      { path: 'Statistics', loadChildren: () => import('./statistics/statistics.module').then(m => StatisticsModule) },
      { path: 'Law', loadChildren: () => import('./law/law.module').then(m => LawModule) },
      { path: 'Org', loadChildren: () => import('./org/org.module').then(m => OrgModule) },
      { path: 'Org1', loadChildren: () => import('./org1/org.module').then(m => Org1Module) },
      { path: 'Org2', loadChildren: () => import('./org2/org.module').then(m => Org2Module) },
      { path: 'Donor', loadChildren: () => import('./donor/donor.module').then(m => DonorModule) },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
