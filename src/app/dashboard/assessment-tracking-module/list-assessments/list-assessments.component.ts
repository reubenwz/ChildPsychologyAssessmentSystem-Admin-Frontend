import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssessmentTrackingService } from '../assessment-tracking.service';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-list-assessments',
  templateUrl: './list-assessments.component.html',
  styleUrls: ['./list-assessments.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAssessmentsComponent implements OnInit {
  constructor(
    public assessmentTrackingService: AssessmentTrackingService,
    public applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.assessmentTrackingService.getAllAssessments();
  }
}
