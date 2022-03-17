import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { AssessmentQuestionRoutingModule } from './assessment-question-routing.module';
import { ListAssessmentQuestionComponent } from './list-assessment-question/list-assessment-question.component';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { CreateDomainDialogComponent } from './list-assessment-question/create-domain-dialog/create-domain-dialog.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { CreateMainQuestionDialogComponent } from './list-assessment-question/create-main-question-dialog/create-main-question-dialog.component';
import { CreateAgeGroupDialogComponent } from './list-assessment-question/create-age-group-dialog/create-age-group-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CreateSubModuleDialogComponent } from './list-assessment-question/create-sub-module-dialog/create-sub-module-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CreateSubQuestionDialogComponent } from './list-assessment-question/create-sub-question-dialog/create-sub-question-dialog.component';
import { ViewSubQuestionDialogComponent } from './list-assessment-question/view-sub-question-dialog/view-sub-question-dialog.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ViewMainQuestionDialogComponent } from './list-assessment-question/view-main-question-dialog/view-main-question-dialog.component';
import { ViewDomainDialogComponent } from './list-assessment-question/view-domain-dialog/view-domain-dialog.component';
import { ViewAgeGroupDialogComponent } from './list-assessment-question/view-age-group-dialog/view-age-group-dialog.component';
import { ViewSubModuleDialogComponent } from './list-assessment-question/view-sub-module-dialog/view-sub-module-dialog.component';

@NgModule({
  declarations: [
    ListAssessmentQuestionComponent,
    CreateDomainDialogComponent,
    CreateMainQuestionDialogComponent,
    CreateAgeGroupDialogComponent,
    CreateSubModuleDialogComponent,
    CreateSubQuestionDialogComponent,
    ViewSubQuestionDialogComponent,
    ViewMainQuestionDialogComponent,
    ViewDomainDialogComponent,
    ViewAgeGroupDialogComponent,
    ViewSubModuleDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssessmentQuestionRoutingModule,
    SharedComponentsModule,
    TableModule,
    TreeTableModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    ToolbarModule,
    RippleModule,
    InputNumberModule,
    CheckboxModule,
    ConfirmDialogModule,
  ],
})
export class AssessmentQuestionModule {}
