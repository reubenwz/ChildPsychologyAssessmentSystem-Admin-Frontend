import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationManagementService } from '../organisation-management.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrganisationManagementServiceActions } from '../organisation-management-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-organisation-dialog',
  templateUrl: './create-organisation-dialog.component.html',
  styleUrls: ['./create-organisation-dialog.component.sass'],
})
export class CreateOrganisationDialogComponent implements OnInit, OnDestroy {
  public organisationCreateForm: FormGroup;
  private organisationServiceStateSubscription$?: Subscription;

  constructor(
    public organisationManagementService: OrganisationManagementService,
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder
  ) {
    this.organisationCreateForm = formBuilder.group({
      name: ['', [Validators.required]],
      organisationTypes: [[], [Validators.required]],
      adminEmail: [
        '',
        [Validators.required, Validators.email, Validators.max(64)],
      ],
      adminName: ['', [Validators.required, Validators.max(32)]],
    });
    this.organisationManagementService.retrieveOrganisationTypes();
  }

  public createOrganisation() {
    this.organisationManagementService.createOrganisation(
      this.organisationCreateForm.getRawValue()
    );
  }

  ngOnInit(): void {
    this.organisationServiceStateSubscription$ =
      this.organisationManagementService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              OrganisationManagementServiceActions.SUCCESSFUL_CREATION
          )
        )
        .subscribe(() => {
          this.organisationCreateForm.reset();
        });
  }

  ngOnDestroy(): void {
    if (this.organisationServiceStateSubscription$) {
      this.organisationServiceStateSubscription$.unsubscribe();
    }
  }
}
