import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssessmentTrackingService } from '../../assessment-tracking.service';
import { ViewSpecificAssessmentService } from '../view-specific-assessment.service';
import { ApplicationStateService } from '../../../../services/application-state.service';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentDetailsComponent {
  constructor(
    public assessmentTrackingService: AssessmentTrackingService,
    public viewSpecificAssessmentService: ViewSpecificAssessmentService,
    public applicationStateService: ApplicationStateService
  ) {}
}
