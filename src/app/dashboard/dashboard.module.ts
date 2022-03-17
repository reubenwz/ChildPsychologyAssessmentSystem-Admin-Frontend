import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { DataUploadDashboardComponent } from './data-upload-dashboard/data-upload-dashboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RippleModule } from 'primeng/ripple';
import { PiechartComponent } from './piechart/piechart.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { DataDownloadDashboardComponent } from './data-download-dashboard/data-download-dashboard.component';
import { DataUploadSearchDialogComponent } from './data-upload-dashboard/data-upload-search-dialog/data-upload-search-dialog.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { TabViewModule } from 'primeng/tabview';
import { UpdateProfileFormComponent } from './profile-settings/update-profile-form/update-profile-form.component';
import { UpdatePasswordFormComponent } from './profile-settings/update-password-form/update-password-form.component';
import { PiechartLocComponent } from './piechart-loc/piechart-loc.component';
import { NgChartsModule } from 'ng2-charts';
import { LocdistributionBarchartComponent } from './locdistribution-barchart/locdistribution-barchart.component';
import { TopneedsBarchartResponseDomainComponent } from './main-dashboard/dashboard-selection-topneeds/topneeds-barchart-response-domain/topneeds-barchart-response-domain.component';
import { SelectManyOrgCheckboxesComponent } from './main-dashboard/select-many-org-checkboxes/select-many-org-checkboxes.component';
import { SelectManyTypeLocdistComponent } from './main-dashboard/select-many-type-locdist/select-many-type-locdist.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TreeSelectModule } from 'primeng/treeselect';
import { DashboardSelectionTopneedsComponent } from './main-dashboard/dashboard-selection-topneeds/dashboard-selection-topneeds.component';
import { TopneedsComponent } from './main-dashboard/topneeds/topneeds.component';
import { ToptraumaComponent } from './main-dashboard/toptrauma/toptrauma.component';
import { TraumapercentageComponent } from './main-dashboard/traumapercentage/traumapercentage.component';
import { AverageResponseDomainComponent } from './main-dashboard/average-response-domain/average-response-domain.component';
import { ClientAssessmentComponent } from './main-dashboard/client-assessment/client-assessment.component';
import { AgePiechartComponent } from './main-dashboard/age-piechart/age-piechart.component';
import { RacePiechartComponent } from './main-dashboard/race-piechart/race-piechart.component';
import { GenderPiechartComponent } from './main-dashboard/gender-piechart/gender-piechart.component';
import { TopstrengthTopneedsComponent } from './main-dashboard/topstrength-topneeds/topstrength-topneeds.component';
import { ToptraumaTraumapercentageComponent } from './main-dashboard/toptrauma-traumapercentage/toptrauma-traumapercentage.component';
import { TooltipModule } from 'primeng/tooltip';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SummaryChartsComponent } from './main-dashboard/summary-charts/summary-charts.component';
import { SplitterModule } from 'primeng/splitter';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    MainDashboardComponent,
    DataUploadDashboardComponent,
    PiechartComponent,
    DataDownloadDashboardComponent,
    DataUploadSearchDialogComponent,
    ProfileSettingsComponent,
    UpdateProfileFormComponent,
    UpdatePasswordFormComponent,
    PiechartLocComponent,
    LocdistributionBarchartComponent,
    TopneedsBarchartResponseDomainComponent,
    SelectManyOrgCheckboxesComponent,
    SelectManyTypeLocdistComponent,
    DashboardSelectionTopneedsComponent,
    TopneedsComponent,
    ToptraumaComponent,
    TraumapercentageComponent,
    AverageResponseDomainComponent,
    ClientAssessmentComponent,
    AgePiechartComponent,
    RacePiechartComponent,
    GenderPiechartComponent,
    TopstrengthTopneedsComponent,
    ToptraumaTraumapercentageComponent,
    SummaryChartsComponent,
  ],
  entryComponents: [DataUploadSearchDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    TableModule,
    SharedComponentsModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    FileUploadModule,
    InputTextModule,
    PanelModule,
    CardModule,
    CalendarModule,
    RadioButtonModule,
    PaginatorModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    NgChartsModule,
    CheckboxModule,
    MultiSelectModule,
    ConfirmPopupModule,
    AutoCompleteModule,
    TreeSelectModule,
    SliderModule,
    TooltipModule,
    ColorPickerModule,
    SplitterModule,
    PasswordModule,
  ],
})
export class DashboardModule {}
