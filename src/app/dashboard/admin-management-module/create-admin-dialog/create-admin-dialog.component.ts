import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AdminUserService } from '../admin-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GendersService } from '../../../services/genders.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminManagementServiceActions } from '../admin-management-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-admin-dialog',
  templateUrl: './create-admin-dialog.component.html',
  styleUrls: ['./create-admin-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdminDialogComponent implements OnInit, OnDestroy {
  public readonly createAdminForm: FormGroup;
  private adminSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    public adminUserService: AdminUserService,
    public gendersService: GendersService,
    private formBuilder: FormBuilder
  ) {
    this.createAdminForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: [new Date(), [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.adminSubscription$ = this.adminUserService.serviceState$
      .pipe(
        filter(
          (result) =>
            result === AdminManagementServiceActions.SUCCESSFUL_CREATION
        )
      )
      .subscribe(() => {
        this.createAdminForm.reset();
      });
  }

  public createAdmin() {
    this.adminUserService.createAdmin(this.createAdminForm.getRawValue());
  }

  ngOnDestroy() {
    if (this.adminSubscription$) {
      this.adminSubscription$.unsubscribe();
    }
  }
}
