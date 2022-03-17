import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { AssessmentRatingsDefinition } from '../../../../models/assessment-ratings-definition';
import { MainQuestion } from '../../../../models/main-question';

@Component({
  selector: 'app-view-main-question-dialog',
  templateUrl: './view-main-question-dialog.component.html',
  styleUrls: ['./view-main-question-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMainQuestionDialogComponent {
  public readonly mainQuestion: MainQuestion;
  public readonly mainQuestionUpdateForm$: BehaviorSubject<FormGroup>;

  constructor(
    public applicationStateService: ApplicationStateService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private assessmentQuestionService: AssessmentQuestionService
  ) {
    this.mainQuestion = this.config.data;
    const controlsConfig: { [p: string]: any } = {
      questionCode: [this.mainQuestion.questionCode, [Validators.required]],
      questionTitle: [this.mainQuestion.questionTitle, [Validators.required]],
      questionDescription: this.formBuilder.array(
        this.mainQuestion.questionDescription &&
          this.mainQuestion.questionDescription.length > 0
          ? this.mainQuestion.questionDescription
          : ['']
      ),
      questionToConsider: this.formBuilder.array(
        this.mainQuestion.questionToConsider &&
          this.mainQuestion.questionToConsider.length > 0
          ? this.mainQuestion.questionToConsider
          : ['']
      ),
    };
    for (let ratingsDefinitionKey in this.mainQuestion.ratingsDefinition) {
      controlsConfig['ratingsDefinition' + ratingsDefinitionKey] = [
        this.mainQuestion.ratingsDefinition[ratingsDefinitionKey],
        [],
      ];
    }
    const subQuestionUpdateForm: FormGroup =
      this.formBuilder.group(controlsConfig);
    this.mainQuestionUpdateForm$ = new BehaviorSubject<FormGroup>(
      subQuestionUpdateForm
    );
  }

  get questionDescription(): FormArray {
    return this.mainQuestionUpdateForm$
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
    return this.mainQuestionUpdateForm$
      .getValue()
      .get('questionToConsider') as FormArray;
  }

  addQuestionToConsider() {
    this.questionToConsider.push(new FormControl(''));
  }

  removeQuestionToConsider(index: number) {
    this.questionToConsider.removeAt(index);
  }

  public saveChanges() {
    const subQuestionUpdateForm = this.mainQuestionUpdateForm$.getValue();
    this.mainQuestion.questionTitle =
      subQuestionUpdateForm.get('questionTitle')?.value;
    this.mainQuestion.questionCode =
      subQuestionUpdateForm.get('questionCode')?.value;
    this.mainQuestion.questionToConsider =
      subQuestionUpdateForm.get('questionToConsider')?.value;
    this.mainQuestion.questionDescription = subQuestionUpdateForm.get(
      'questionDescription'
    )?.value;
    const newRatingsDefinition: AssessmentRatingsDefinition = {};
    for (let ratingsDefinitionKey in this.mainQuestion.ratingsDefinition) {
      newRatingsDefinition[ratingsDefinitionKey] = subQuestionUpdateForm.get(
        'ratingsDefinition' + ratingsDefinitionKey
      )?.value;
    }
    this.mainQuestion.ratingsDefinition = newRatingsDefinition;
    this.assessmentQuestionService.updateAssessmentQuestionState();
    this.ref.close();
  }
}
