import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Domain } from '../../../../models/domain';
import { filter } from 'rxjs/operators';
import { AssessmentQuestionServiceActions } from '../../assessment-question-service-actions';
import { AgeGroup } from '../../../../models/age-group';

@Component({
  selector: 'app-create-age-group-dialog',
  templateUrl: './create-age-group-dialog.component.html',
  styleUrls: ['./create-age-group-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAgeGroupDialogComponent implements OnInit, OnDestroy {
  public readonly domainParent: Domain;
  public readonly createAgeGroupForm: FormGroup;
  private assessmentQuestionServiceSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {
    this.domainParent = config.data;

    this.createAgeGroupForm = this.formBuilder.group({
      startAge: ['5', [Validators.required]],
      endAge: ['10', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.assessmentQuestionServiceSubscription$ =
      this.assessmentQuestionService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              AssessmentQuestionServiceActions.SUCCESSFUL_AGE_GROUP_CREATION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  public createAgeGroup() {
    const ageGroupParams: AgeGroup = {
      ageRange:
        this.createAgeGroupForm.get('startAge')?.value +
        '-' +
        this.createAgeGroupForm.get('endAge')?.value,
      questions: [],
    };
    this.assessmentQuestionService.createAgeGroup(
      ageGroupParams,
      this.domainParent
    );
  }

  ngOnDestroy(): void {
    if (this.assessmentQuestionServiceSubscription$) {
      this.assessmentQuestionServiceSubscription$.unsubscribe();
    }
  }
}
