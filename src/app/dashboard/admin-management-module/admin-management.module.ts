import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { AdminManagementModuleComponent } from './admin-management-module.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CreateAdminDialogComponent } from './create-admin-dialog/create-admin-dialog.component';
import { DeleteAdminConfirmationDialogComponent } from './delete-admin-confirmation-dialog/delete-admin-confirmation-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AdminManagementModuleComponent,
    CreateAdminDialogComponent,
    DeleteAdminConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminManagementRoutingModule,
    SharedComponentsModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class AdminManagementModule {}
