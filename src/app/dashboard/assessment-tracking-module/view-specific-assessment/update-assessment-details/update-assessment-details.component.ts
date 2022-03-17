import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssessmentTrackingService } from '../../assessment-tracking.service';
import { ViewSpecificAssessmentService } from '../view-specific-assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationStateService } from '../../../../services/application-state.service';

@Component({
  selector: 'app-update-assessment-details',
  templateUrl: './update-assessment-details.component.html',
  styleUrls: ['./update-assessment-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAssessmentDetailsComponent implements OnInit {
  public updateAssessmentForm?: FormGroup;

  constructor(
    public assessmentTrackingService: AssessmentTrackingService,
    public viewSpecificAssessmentService: ViewSpecificAssessmentService,
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const assessment =
      this.assessmentTrackingService.specificAssessment$.getValue();

    if (assessment) {
      this.updateAssessmentForm = this.formBuilder.group({
        status: [assessment.status, [Validators.required]],
      });
    }
  }

  updateAssessment() {
    const assessment =
      this.assessmentTrackingService.specificAssessment$.getValue();

    if (assessment && this.updateAssessmentForm) {
      this.assessmentTrackingService.updateSpecificAssessment(
        assessment.assessmentId,
        this.updateAssessmentForm.getRawValue()
      );
    }
  }
}
