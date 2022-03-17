import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssessmentTrackingService } from '../../assessment-tracking.service';

@Component({
  selector: 'app-caregiver-assessment-result',
  templateUrl: './caregiver-assessment-result.component.html',
  styleUrls: ['./caregiver-assessment-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaregiverAssessmentResultComponent implements OnInit {
  constructor(public assessmentTrackingService: AssessmentTrackingService) {}

  ngOnInit(): void {}
}
