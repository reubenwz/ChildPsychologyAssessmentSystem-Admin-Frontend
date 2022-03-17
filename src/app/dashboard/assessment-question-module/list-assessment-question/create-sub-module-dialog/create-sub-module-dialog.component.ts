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
import { MainQuestion } from '../../../../models/main-question';
import { filter } from 'rxjs/operators';
import { AssessmentQuestionServiceActions } from '../../assessment-question-service-actions';
import { SubModule } from '../../../../models/sub-module';

@Component({
  selector: 'app-create-sub-module-dialog',
  templateUrl: './create-sub-module-dialog.component.html',
  styleUrls: ['./create-sub-module-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSubModuleDialogComponent implements OnInit, OnDestroy {
  public readonly mainQuestionParent: MainQuestion;
  public readonly createSubModuleForm$: BehaviorSubject<FormGroup>;
  private assessmentQuestionServiceSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {
    this.mainQuestionParent = this.config.data;

    const createSubModuleForm = this.formBuilder.group({
      subModuleName: ['', [Validators.required]],
      subModuleDescription: this.formBuilder.array(['']),
      isInfo: [false, []],
    });

    this.createSubModuleForm$ = new BehaviorSubject<FormGroup>(
      createSubModuleForm
    );
  }

  get subModuleDescription(): FormArray {
    return this.createSubModuleForm$
      .getValue()
      .get('subModuleDescription') as FormArray;
  }

  addSubModuleDescription() {
    this.subModuleDescription.push(new FormControl(''));
  }

  removeSubModuleDescription(index: number) {
    this.subModuleDescription.removeAt(index);
  }

  ngOnInit(): void {
    // Close dialog upon success
    this.assessmentQuestionServiceSubscription$ =
      this.assessmentQuestionService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              AssessmentQuestionServiceActions.SUCCESSFUL_SUB_MODULE_CREATION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  public createSubModule() {
    const createSubModuleForm = this.createSubModuleForm$.getValue();
    const subModuleParams: SubModule = {
      subQues: [],
      subModuleName: createSubModuleForm.get('subModuleName')?.value,
      subModuleDescription: this.subModuleDescription.value,
      isInfo: createSubModuleForm.get('isInfo')?.value,
    };
    this.assessmentQuestionService.createSubModule(
      subModuleParams,
      this.mainQuestionParent
    );
  }

  ngOnDestroy(): void {
    if (this.assessmentQuestionServiceSubscription$) {
      this.assessmentQuestionServiceSubscription$.unsubscribe();
    }
  }
}
