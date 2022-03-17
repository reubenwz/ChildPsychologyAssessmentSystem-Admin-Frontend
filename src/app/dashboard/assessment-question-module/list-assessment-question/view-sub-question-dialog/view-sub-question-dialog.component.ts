import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubQuestion } from '../../../../models/sub-question';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AssessmentRatingsDefinition } from '../../../../models/assessment-ratings-definition';
import { AssessmentQuestionService } from '../../assessment-question.service';

@Component({
  selector: 'app-view-sub-question-dialog',
  templateUrl: './view-sub-question-dialog.component.html',
  styleUrls: ['./view-sub-question-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSubQuestionDialogComponent {
  public readonly subQuestion: SubQuestion;
  public readonly subQuestionUpdateForm$: BehaviorSubject<FormGroup>;

  constructor(
    public applicationStateService: ApplicationStateService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private assessmentQuestionService: AssessmentQuestionService
  ) {
    this.subQuestion = this.config.data;
    const controlsConfig: { [p: string]: any } = {
      questionCode: [this.subQuestion.questionCode, [Validators.required]],
      questionTitle: [this.subQuestion.questionTitle, [Validators.required]],
      questionDescription: this.formBuilder.array(
        this.subQuestion.questionDescription &&
          this.subQuestion.questionDescription.length !== 0
          ? this.subQuestion.questionDescription
          : ['']
      ),
      questionToConsider: this.formBuilder.array(
        this.subQuestion.questionToConsider &&
          this.subQuestion.questionToConsider.length !== 0
          ? this.subQuestion.questionToConsider
          : ['']
      ),
    };
    for (let ratingsDefinitionKey in this.subQuestion.ratingsDefinition) {
      controlsConfig['ratingsDefinition' + ratingsDefinitionKey] = [
        this.subQuestion.ratingsDefinition[ratingsDefinitionKey],
        [],
      ];
    }
    const subQuestionUpdateForm: FormGroup =
      this.formBuilder.group(controlsConfig);
    this.subQuestionUpdateForm$ = new BehaviorSubject<FormGroup>(
      subQuestionUpdateForm
    );
  }

  get questionDescription(): FormArray {
    return this.subQuestionUpdateForm$
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
    return this.subQuestionUpdateForm$
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
    const subQuestionUpdateForm = this.subQuestionUpdateForm$.getValue();
    this.subQuestion.questionTitle =
      subQuestionUpdateForm.get('questionTitle')?.value;
    this.subQuestion.questionCode =
      subQuestionUpdateForm.get('questionCode')?.value;
    this.subQuestion.questionToConsider =
      subQuestionUpdateForm.get('questionToConsider')?.value;
    this.subQuestion.questionDescription = subQuestionUpdateForm.get(
      'questionDescription'
    )?.value;
    const newRatingsDefinition: AssessmentRatingsDefinition = {};
    for (let ratingsDefinitionKey in this.subQuestion.ratingsDefinition) {
      newRatingsDefinition[ratingsDefinitionKey] = subQuestionUpdateForm.get(
        'ratingsDefinition' + ratingsDefinitionKey
      )?.value;
    }
    this.subQuestion.ratingsDefinition = newRatingsDefinition;
    this.assessmentQuestionService.updateAssessmentQuestionState();
    this.ref.close();
  }
}
