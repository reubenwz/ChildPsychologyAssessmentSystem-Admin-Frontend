import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManagementModuleComponent } from './admin-management-module.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: AdminManagementModuleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManagementRoutingModule {}
