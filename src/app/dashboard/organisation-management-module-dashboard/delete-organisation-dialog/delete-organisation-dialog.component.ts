import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OrganisationManagementService } from '../organisation-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs/operators';
import { OrganisationManagementServiceActions } from '../organisation-management-service-actions';
import { Subscription } from 'rxjs';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-delete-organisation-dialog',
  templateUrl: './delete-organisation-dialog.component.html',
  styleUrls: ['./delete-organisation-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteOrganisationDialogComponent implements OnInit, OnDestroy {
  public deleteOrganisationForm: FormGroup;
  private organisationServiceStateSubscription$?: Subscription;

  constructor(
    public organisationManagementService: OrganisationManagementService,
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.deleteOrganisationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.organisationServiceStateSubscription$ =
      this.organisationManagementService.serviceState$
        .pipe(
          filter(
            (result) =>
              result ===
              OrganisationManagementServiceActions.SUCCESSFUL_DELETION
          )
        )
        .subscribe(() => {
          this.ref.close();
        });
  }

  ngOnDestroy(): void {
    if (this.organisationServiceStateSubscription$) {
      this.organisationServiceStateSubscription$.unsubscribe();
    }
  }

  public isFormValid(): boolean {
    const selectedOrg =
      this.organisationManagementService.selectedOrganisation$.value;
    return (
      selectedOrg !== null &&
      this.deleteOrganisationForm.get('name')?.value === selectedOrg.name
    );
  }

  public deleteOrganisation() {
    const selectedOrg =
      this.organisationManagementService.selectedOrganisation$.value;
    if (selectedOrg) {
      this.organisationManagementService.deleteOrganisation(
        selectedOrg.organisationId
      );
    }
  }
}
