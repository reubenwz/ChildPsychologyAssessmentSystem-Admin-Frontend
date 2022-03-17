import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SubModule } from '../../../../models/sub-module';

@Component({
  selector: 'app-view-sub-module-dialog',
  templateUrl: './view-sub-module-dialog.component.html',
  styleUrls: ['./view-sub-module-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSubModuleDialogComponent {
  public readonly subModule: SubModule;
  public readonly updateSubModuleForm$: BehaviorSubject<FormGroup>;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {
    this.subModule = this.config.data;

    const updateSubModuleForm: FormGroup = this.formBuilder.group({
      subModuleName: [this.subModule.subModuleName, [Validators.required]],
      subModuleDescription: this.formBuilder.array(
        this.subModule.subModuleDescription &&
          this.subModule.subModuleDescription.length > 0
          ? this.subModule.subModuleDescription
          : ['']
      ),
      isInfo: [this.subModule.isInfo, []],
    });

    this.updateSubModuleForm$ = new BehaviorSubject<FormGroup>(
      updateSubModuleForm
    );
  }

  get subModuleDescription(): FormArray {
    return this.updateSubModuleForm$
      .getValue()
      .get('subModuleDescription') as FormArray;
  }

  addSubModuleDescription() {
    this.subModuleDescription.push(new FormControl(''));
  }

  removeSubModuleDescription(index: number) {
    this.subModuleDescription.removeAt(index);
  }

  public updateSubModule() {
    const updateSubModuleForm = this.updateSubModuleForm$.getValue();
    this.subModule.subModuleName =
      updateSubModuleForm.get('subModuleName')?.value;
    this.subModule.subModuleDescription = this.subModuleDescription.value;
    this.subModule.isInfo = updateSubModuleForm.get('isInfo')?.value;
    this.assessmentQuestionService.updateAssessmentQuestionState();
    this.ref.close();
  }
}
