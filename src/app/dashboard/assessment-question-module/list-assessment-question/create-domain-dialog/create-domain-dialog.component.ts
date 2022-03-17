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
import { ApplicationStateService } from '../../../../services/application-state.service';
import { AssessmentQuestionService } from '../../assessment-question.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AssessmentQuestionServiceActions } from '../../assessment-question-service-actions';
import { Domain } from '../../../../models/domain';

@Component({
  selector: 'app-create-domain-dialog',
  templateUrl: './create-domain-dialog.component.html',
  styleUrls: ['./create-domain-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDomainDialogComponent implements OnInit, OnDestroy {
  public readonly createDomainForm$: BehaviorSubject<FormGroup>;
  private assessmentQuestionServiceSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    const createDomainForm = this.formBuilder.group({
      domainName: ['', [Validators.required]],
      domainDescription: this.formBuilder.array(['']),
      module: [false, []],
      caregiverDomain: [false, []],
    });
    this.createDomainForm$ = new BehaviorSubject<FormGroup>(createDomainForm);
  }

  ngOnInit(): void {
    // Close dialog upon success
    this.assessmentQuestionServiceSubscription$ =
      this.assessmentQuestionService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              AssessmentQuestionServiceActions.SUCCESSFUL_DOMAIN_CREATION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  public createDomain() {
    const createDomainForm = this.createDomainForm$.getValue();
    const domain: Domain = {
      ageGroups: [],
      domainName: createDomainForm.get('domainName')?.value,
      domainDescription: this.domainDescription.value,
      module: createDomainForm.get('module')?.value,
      caregiverDomain: createDomainForm.get('caregiverDomain')?.value,
    };
    this.assessmentQuestionService.createDomain(domain);
  }

  get domainDescription(): FormArray {
    return this.createDomainForm$
      .getValue()
      .get('domainDescription') as FormArray;
  }

  addDomainDescription() {
    this.domainDescription.push(new FormControl(''));
  }

  removeDomainDescription(index: number) {
    this.domainDescription.removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.assessmentQuestionServiceSubscription$) {
      this.assessmentQuestionServiceSubscription$.unsubscribe();
    }
  }
}
