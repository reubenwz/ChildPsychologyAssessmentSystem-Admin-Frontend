import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationManagementModuleDashboardComponent } from './organisation-management-module-dashboard.component';
import { CreateOrganisationDialogComponent } from './create-organisation-dialog/create-organisation-dialog.component';
import { DeleteOrganisationDialogComponent } from './delete-organisation-dialog/delete-organisation-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganisationManagementRoutingModule } from './organisation-management-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { AssessorManagementModule } from '../assessor-management-module/assessor-management.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    OrganisationManagementModuleDashboardComponent,
    CreateOrganisationDialogComponent,
    DeleteOrganisationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrganisationManagementRoutingModule,
    SharedComponentsModule,
    MessagesModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    AssessorManagementModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
  ],
})
export class OrganisationManagementModule {}
