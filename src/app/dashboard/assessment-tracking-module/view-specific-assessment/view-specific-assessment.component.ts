import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssessmentTrackingService } from '../assessment-tracking.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ViewSpecificAssessmentService } from './view-specific-assessment.service';

@Component({
  selector: 'app-view-specific-assessment',
  templateUrl: './view-specific-assessment.component.html',
  styleUrls: ['./view-specific-assessment.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSpecificAssessmentComponent implements OnInit {
  private routeSubscription$?: Subscription;

  constructor(
    public viewSpecificAssessmentService: ViewSpecificAssessmentService,
    private assessmentTrackingService: AssessmentTrackingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription$ = this.route.params.subscribe((routeParams) => {
      const routeId = routeParams['id'];
      if (routeId !== null) {
        const assessmentId = Number.parseInt(routeId);
        this.assessmentTrackingService.viewSpecificAssessment(assessmentId);
      }
    });
  }
}
