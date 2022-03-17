import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssessmentTrackingService } from '../../assessment-tracking.service';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentResultComponent implements OnInit {
  constructor(public assessmentTrackingService: AssessmentTrackingService) {}

  ngOnInit(): void {}
}
