import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApplicationStateService } from '../../services/application-state.service';
import { BehaviorSubject } from 'rxjs';
import { Assessment } from '../../models/assessment';
import { DenormalizedCaretakerAssessment } from '../../models/denormalized-caretaker-assessment';
import { UpdateAssessmentDetailsParams } from './view-specific-assessment/update-assessment-details/update-assessment-details-params';

@Injectable({
  providedIn: 'root',
})
export class AssessmentTrackingService {
  public readonly assessments$: BehaviorSubject<Assessment[]> =
    new BehaviorSubject<Assessment[]>([]);
  public readonly specificAssessment$: BehaviorSubject<Assessment | null> =
    new BehaviorSubject<Assessment | null>(null);
  public readonly denormalizedCaretakerAssessments$: BehaviorSubject<
    DenormalizedCaretakerAssessment[]
  > = new BehaviorSubject<DenormalizedCaretakerAssessment[]>([]);

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService
  ) {}

  public getAllAssessments() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Assessment[]>(
        '/cans-backend-rws/Resources/AssessmentManagement-AdminSystem/assessments'
      )
      .subscribe(
        (assessments) => {
          this.applicationStateService.endProcessing();
          this.assessments$.next(assessments);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public viewSpecificAssessment(id: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Assessment>(
        '/cans-backend-rws/Resources/AssessmentManagement-AdminSystem/assessments/' +
          id
      )
      .subscribe(
        (assessment) => {
          this.applicationStateService.endProcessing();
          this.specificAssessment$.next(assessment);
          this.transformAssessmentToDenormalizedCaretakerAssessment(assessment);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public updateSpecificAssessment(
    id: number,
    updateAssessmentDetailsParams: UpdateAssessmentDetailsParams
  ) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPatch<Assessment>(
        '/cans-backend-rws/Resources/AssessmentManagement-AdminSystem/assessments/' +
          id,
        JSON.parse(JSON.stringify(updateAssessmentDetailsParams))
      )
      .subscribe(
        (assessment) => {
          this.applicationStateService.showSuccessMessage(
            'Assessment updated successfully!'
          );
          // Refresh assessment
          this.viewSpecificAssessment(id);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  private transformAssessmentToDenormalizedCaretakerAssessment(
    specificAssessment: Assessment
  ) {
    if (specificAssessment) {
      const denormalizedCaretakerAssessments: DenormalizedCaretakerAssessment[] =
        [];
      for (const caretakerAssessment of specificAssessment.caretakerAssessments) {
        if (caretakerAssessment.caretakerResponses.length > 0) {
          for (const caretakerResponse of caretakerAssessment.caretakerResponses) {
            const denormalizedCaretakerAssessment: DenormalizedCaretakerAssessment =
              {
                caretakerAssessmentId:
                  caretakerAssessment.caretakerAssessmentId,
                caretaker: caretakerAssessment.caretaker,
                assessment: caretakerAssessment.assessment,
                caretakerType: caretakerAssessment.caretakerType,
                levelOfNeeds: caretakerAssessment.levelOfNeeds,
                caretakerResponse: caretakerResponse,
              };
            denormalizedCaretakerAssessments.push(
              denormalizedCaretakerAssessment
            );
          }
        } else {
          const denormalizedCaretakerAssessment: DenormalizedCaretakerAssessment =
            {
              caretakerAssessmentId: caretakerAssessment.caretakerAssessmentId,
              caretaker: caretakerAssessment.caretaker,
              assessment: caretakerAssessment.assessment,
              caretakerType: caretakerAssessment.caretakerType,
              levelOfNeeds: caretakerAssessment.levelOfNeeds,
            };
          denormalizedCaretakerAssessments.push(
            denormalizedCaretakerAssessment
          );
        }
      }
      this.denormalizedCaretakerAssessments$.next(
        denormalizedCaretakerAssessments
      );
    }
  }
}
