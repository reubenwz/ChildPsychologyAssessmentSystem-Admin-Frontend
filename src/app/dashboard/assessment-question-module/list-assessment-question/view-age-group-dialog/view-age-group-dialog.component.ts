import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgeGroup } from '../../../../models/age-group';

@Component({
  selector: 'app-view-age-group-dialog',
  templateUrl: './view-age-group-dialog.component.html',
  styleUrls: ['./view-age-group-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAgeGroupDialogComponent {
  public readonly updateAgeGroupForm$: BehaviorSubject<FormGroup>;
  public readonly ageGroup: AgeGroup;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.ageGroup = this.config.data;
    const ageRanges = this.ageGroup.ageRange.split('-');
    const updateAgeGroupForm = this.formBuilder.group({
      startAge: [ageRanges[0], [Validators.required]],
      endAge: [ageRanges[1], [Validators.required]],
    });
    this.updateAgeGroupForm$ = new BehaviorSubject<FormGroup>(
      updateAgeGroupForm
    );
  }

  public updateAgeGroup() {
    const ageGroupUpdateForm = this.updateAgeGroupForm$.getValue();
    this.ageGroup.ageRange =
      ageGroupUpdateForm.get('startAge')?.value +
      '-' +
      ageGroupUpdateForm.get('endAge')?.value;
    this.assessmentQuestionService.updateAssessmentQuestionState();
    this.ref.close();
  }
}
