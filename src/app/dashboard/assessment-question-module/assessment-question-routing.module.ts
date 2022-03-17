import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssessmentQuestionComponent } from './list-assessment-question/list-assessment-question.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: ListAssessmentQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentQuestionRoutingModule {}
