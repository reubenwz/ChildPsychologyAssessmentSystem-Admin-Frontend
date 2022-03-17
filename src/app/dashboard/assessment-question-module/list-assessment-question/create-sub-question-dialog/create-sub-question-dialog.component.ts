import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs/operators';
import { AssessmentQuestionServiceActions } from '../../assessment-question-service-actions';
import { SubModule } from '../../../../models/sub-module';
import { SubQuestion } from '../../../../models/sub-question';
import { AssessmentRatingsDefinition } from '../../../../models/assessment-ratings-definition';

@Component({
  selector: 'app-create-sub-question-dialog',
  templateUrl: './create-sub-question-dialog.component.html',
  styleUrls: ['./create-sub-question-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSubQuestionDialogComponent implements OnInit, OnDestroy {
  public readonly subModuleParent: SubModule;
  public readonly createSubQuestionForm$: BehaviorSubject<FormGroup>;
  private assessmentQuestionServiceSubscription$?: Subscription;
  public readonly MIN_SCORE = 0;
  public readonly MAX_SCORE = 3;
  public readonly MAX_SCORE_EXCLUSIVE = this.MAX_SCORE + 1;
  public readonly SCORE_RANGE: number[];

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {
    this.subModuleParent = config.data;
    const controlsConfig: { [p: string]: any } = {
      questionCode: ['', [Validators.required]],
      questionTitle: ['', [Validators.required]],
      questionDescription: this.formBuilder.array(['']),
      questionToConsider: this.formBuilder.array(['']),
    };
    const scoreRange: number[] = [];
    for (let x = this.MIN_SCORE; x < this.MAX_SCORE_EXCLUSIVE; x++) {
      controlsConfig['ratingsDefinition' + x] = ['', []];
      scoreRange.push(x);
    }
    this.SCORE_RANGE = scoreRange;
    const createSubQuestionForm = this.formBuilder.group(controlsConfig);
    this.createSubQuestionForm$ = new BehaviorSubject<FormGroup>(
      createSubQuestionForm
    );
  }

  ngOnInit(): void {
    // Close dialog upon success
    this.assessmentQuestionServiceSubscription$ =
      this.assessmentQuestionService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              AssessmentQuestionServiceActions.SUCCESSFUL_SUB_QUESTION_CREATION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  public createSubQuestion() {
    const createSubQuestionForm = this.createSubQuestionForm$.getValue();
    const ratingsDefinition: AssessmentRatingsDefinition = {};
    for (let x = this.MIN_SCORE; x < this.MAX_SCORE_EXCLUSIVE; x++) {
      ratingsDefinition[x] = createSubQuestionForm.get(
        'ratingsDefinition' + x
      )?.value;
    }
    const subQuestionParams: SubQuestion = {
      ratingsDefinition: ratingsDefinition,
      questionCode: createSubQuestionForm.get('questionCode')?.value,
      questionTitle: createSubQuestionForm.get('questionTitle')?.value,
      questionToConsider: this.questionToConsider.value,
      questionDescription: this.questionDescription.value,
    };

    this.assessmentQuestionService.createSubQuestion(
      subQuestionParams,
      this.subModuleParent
    );
  }

  get questionDescription(): FormArray {
    return this.createSubQuestionForm$
      .getValue()
      .get('questionDescription') as FormArray;
  }

  addQuestionDescription() {
    this.questionDescription.push(new FormControl(''));
  }

  removeQuestionDescription(index: number) {
    this.questionDescription.removeAt(index);
  }

  get questionToConsider(): FormArray {
    return this.createSubQuestionForm$
      .getValue()
      .get('questionToConsider') as FormArray;
  }

  addQuestionToConsider() {
    this.questionToConsider.push(new FormControl(''));
  }

  removeQuestionToConsider(index: number) {
    this.questionToConsider.removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.assessmentQuestionServiceSubscription$) {
      this.assessmentQuestionServiceSubscription$.unsubscribe();
    }
  }
}
