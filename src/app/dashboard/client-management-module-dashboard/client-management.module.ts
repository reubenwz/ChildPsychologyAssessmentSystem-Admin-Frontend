import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientManagementRoutingModule } from './client-management-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ClientManagementModuleDashboardComponent } from './client-management-module-dashboard.component';
import { ViewSpecificClientDialogComponent } from './view-specific-client-dialog/view-specific-client-dialog.component';
import { DeleteSpecificClientDialogComponent } from './delete-specific-client-dialog/delete-specific-client-dialog.component';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';
import { CreateCaretakerDialogComponent } from './create-caretaker-dialog/create-caretaker-dialog.component';
import { UpdateSpecificClientComponent } from './view-specific-client-dialog/update-specific-client/update-specific-client.component';
import { ViewSpecificClientCaretakersComponent } from './view-specific-client-dialog/view-specific-client-caretakers/view-specific-client-caretakers.component';

@NgModule({
  declarations: [
    ClientManagementModuleDashboardComponent,
    ViewSpecificClientDialogComponent,
    DeleteSpecificClientDialogComponent,
    CreateClientDialogComponent,
    CreateCaretakerDialogComponent,
    UpdateSpecificClientComponent,
    ViewSpecificClientCaretakersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientManagementRoutingModule,
    MultiSelectModule,
    InputTextModule,
    MessagesModule,
    ButtonModule,
    SharedComponentsModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    DropdownModule,
    CalendarModule,
  ],
})
export class ClientManagementModule {}
