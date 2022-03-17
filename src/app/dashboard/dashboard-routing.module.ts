import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DataUploadDashboardComponent } from './data-upload-dashboard/data-upload-dashboard.component';
import { DataDownloadDashboardComponent } from './data-download-dashboard/data-download-dashboard.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: MainDashboardComponent,
  },
  {
    path: 'clients',
    loadChildren: () =>
      import(
        './client-management-module-dashboard/client-management.module'
      ).then((m) => m.ClientManagementModule),
  },
  {
    path: 'data-upload',
    component: DataUploadDashboardComponent,
  },
  {
    path: 'data-download',
    component: DataDownloadDashboardComponent,
  },
  {
    path: 'admins',
    loadChildren: () =>
      import('./admin-management-module/admin-management.module').then(
        (m) => m.AdminManagementModule
      ),
  },
  {
    path: 'assessors',
    loadChildren: () =>
      import('./assessor-management-module/assessor-management.module').then(
        (m) => m.AssessorManagementModule
      ),
  },
  {
    path: 'organisations',
    loadChildren: () =>
      import(
        './organisation-management-module-dashboard/organisation-management.module'
      ).then((m) => m.OrganisationManagementModule),
  },
  {
    path: 'assessments',
    loadChildren: () =>
      import('./assessment-tracking-module/assessment-tracking.module').then(
        (m) => m.AssessmentTrackingModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./assessment-question-module/assessment-question.module').then(
        (m) => m.AssessmentQuestionModule
      ),
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
