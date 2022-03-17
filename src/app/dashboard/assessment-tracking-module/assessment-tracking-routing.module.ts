import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssessmentsComponent } from './list-assessments/list-assessments.component';
import { ViewSpecificAssessmentComponent } from './view-specific-assessment/view-specific-assessment.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: ListAssessmentsComponent,
  },
  {
    path: ':id',
    component: ViewSpecificAssessmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentTrackingRoutingModule {}
