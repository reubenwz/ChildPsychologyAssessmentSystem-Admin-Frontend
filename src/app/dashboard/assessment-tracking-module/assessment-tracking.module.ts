import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentTrackingRoutingModule } from './assessment-tracking-routing.module';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { ListAssessmentsComponent } from './list-assessments/list-assessments.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ViewSpecificAssessmentComponent } from './view-specific-assessment/view-specific-assessment.component';
import { AssessmentDetailsComponent } from './view-specific-assessment/assessment-details/assessment-details.component';
import { AssessmentResultComponent } from './view-specific-assessment/assessment-result/assessment-result.component';
import { CaregiverAssessmentResultComponent } from './view-specific-assessment/caregiver-assessment-result/caregiver-assessment-result.component';
import { UpdateAssessmentDetailsComponent } from './view-specific-assessment/update-assessment-details/update-assessment-details.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ListAssessmentsComponent,
    ViewSpecificAssessmentComponent,
    AssessmentDetailsComponent,
    AssessmentResultComponent,
    CaregiverAssessmentResultComponent,
    UpdateAssessmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssessmentTrackingRoutingModule,
    SharedComponentsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputTextModule,
    DropdownModule,
  ],
})
export class AssessmentTrackingModule {}
