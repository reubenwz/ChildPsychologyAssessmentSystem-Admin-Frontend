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
import { Domain } from '../../../../models/domain';

@Component({
  selector: 'app-view-domain-dialog',
  templateUrl: './view-domain-dialog.component.html',
  styleUrls: ['./view-domain-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDomainDialogComponent {
  public readonly domain: Domain;
  public readonly updateDomainForm$: BehaviorSubject<FormGroup>;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessmentQuestionService: AssessmentQuestionService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.domain = this.config.data;
    const updateDomainForm = this.formBuilder.group({
      domainName: [this.domain.domainName, [Validators.required]],
      domainDescription: this.formBuilder.array(
        this.domain.domainDescription &&
          this.domain.domainDescription.length > 0
          ? this.domain.domainDescription
          : ['']
      ),
      module: [this.domain.module, []],
      caregiverDomain: [this.domain.caregiverDomain, []],
    });
    this.updateDomainForm$ = new BehaviorSubject<FormGroup>(updateDomainForm);
  }

  get domainDescription(): FormArray {
    return this.updateDomainForm$
      .getValue()
      .get('domainDescription') as FormArray;
  }

  addDomainDescription() {
    this.domainDescription.push(new FormControl(''));
  }

  removeDomainDescription(index: number) {
    this.domainDescription.removeAt(index);
  }

  updateDomain() {
    const domainUpdateForm = this.updateDomainForm$.getValue();
    this.domain.domainName = domainUpdateForm.get('domainName')?.value;
    this.domain.domainDescription = this.domainDescription.value;
    this.domain.module = domainUpdateForm.get('module')?.value;
    this.domain.caregiverDomain =
      domainUpdateForm.get('caregiverDomain')?.value;
    this.assessmentQuestionService.updateAssessmentQuestionState();
    this.ref.close();
  }
}
