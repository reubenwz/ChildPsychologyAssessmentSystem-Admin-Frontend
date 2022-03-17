import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgeGroup } from '../../../../models/age-group';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { filter } from 'rxjs/operators';
import { AssessmentQuestionServiceActions } from '../../assessment-question-service-actions';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AssessmentRatingsDefinition } from '../../../../models/assessment-ratings-definition';
import { MainQuestion } from '../../../../models/main-question';

@Component({
  selector: 'app-create-main-question-dialog',
  templateUrl: './create-main-question-dialog.component.html',
  styleUrls: ['./create-main-question-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMainQuestionDialogComponent implements OnInit, OnDestroy {
  public readonly ageGroupParent: AgeGroup;
  public readonly createMainQuestionForm$: BehaviorSubject<FormGroup>;
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
    this.ageGroupParent = config.data;

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
    this.createMainQuestionForm$ = new BehaviorSubject<FormGroup>(
      this.formBuilder.group(controlsConfig)
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
              AssessmentQuestionServiceActions.SUCCESSFUL_MAIN_QUESTION_CREATION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  get questionDescription(): FormArray {
    return this.createMainQuestionForm$
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
    return this.createMainQuestionForm$
      .getValue()
      .get('questionToConsider') as FormArray;
  }

  addQuestionToConsider() {
    this.questionToConsider.push(new FormControl(''));
  }

  removeQuestionToConsider(index: number) {
    this.questionToConsider.removeAt(index);
  }

  public createMainQuestion() {
    const createMainQuestionForm = this.createMainQuestionForm$.getValue();
    const ratingsDefinition: AssessmentRatingsDefinition = {};
    for (let x = this.MIN_SCORE; x < this.MAX_SCORE_EXCLUSIVE; x++) {
      ratingsDefinition[x] = createMainQuestionForm.get(
        'ratingsDefinition' + x
      )?.value;
    }
    const mainQuestionParams: MainQuestion = {
      questionCode: createMainQuestionForm.get('questionCode')?.value,
      questionTitle: createMainQuestionForm.get('questionTitle')?.value,
      questionToConsider: this.questionToConsider.value,
      questionDescription: this.questionDescription.value,
      ratingsDefinition: ratingsDefinition,
    };

    this.assessmentQuestionService.createMainQuestion(
      mainQuestionParams,
      this.ageGroupParent
    );
  }

  ngOnDestroy(): void {
    if (this.assessmentQuestionServiceSubscription$) {
      this.assessmentQuestionServiceSubscription$.unsubscribe();
    }
  }
}
