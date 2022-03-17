import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUser } from '../../../models/admin-user';
import { AdminUserService } from '../admin-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminManagementServiceActions } from '../admin-management-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-delete-admin-confirmation-dialog',
  templateUrl: './delete-admin-confirmation-dialog.component.html',
  styleUrls: ['./delete-admin-confirmation-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAdminConfirmationDialogComponent
  implements OnInit, OnDestroy
{
  public admin: AdminUser;
  public deleteAdminForm: FormGroup;
  private adminServiceState$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public adminUserService: AdminUserService,
    private formBuilder: FormBuilder
  ) {
    this.admin = this.config.data;
    this.deleteAdminForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.adminServiceState$ = this.adminUserService.serviceState$
      .pipe(
        filter(
          (result) =>
            result === AdminManagementServiceActions.SUCCESSFUL_DELETION
        )
      )
      .subscribe(() => {
        this.ref.close();
      });
  }

  ngOnDestroy(): void {
    if (this.adminServiceState$) {
      this.adminServiceState$.unsubscribe();
    }
  }

  public canDelete(): boolean {
    return (
      this.deleteAdminForm.valid &&
      this.deleteAdminForm.get('email')?.value === this.admin.email
    );
  }

  public deleteAdmin() {
    if (this.canDelete()) {
      this.adminUserService.deleteAdmin(this.admin);
    }
  }
}
