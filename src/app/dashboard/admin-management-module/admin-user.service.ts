import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AdminUser } from '../../models/admin-user';
import { CreateAdminParams } from './create-admin-dialog/create-admin-params';
import { AdminManagementServiceActions } from './admin-management-service-actions';
import { ApplicationStateService } from '../../services/application-state.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  public existingAdminUsers$: BehaviorSubject<AdminUser[]> =
    new BehaviorSubject<AdminUser[]>([]);
  public readonly serviceState$: Subject<AdminManagementServiceActions> =
    new Subject<AdminManagementServiceActions>();

  constructor(
    private applicationStateService: ApplicationStateService,
    private apiService: ApiService
  ) {}

  public getAdminUsers() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<AdminUser[]>(
        '/cans-backend-rws/Resources/AdminUser/admins'
      )
      .subscribe(
        (adminUsers) => {
          this.applicationStateService.endProcessing();
          this.existingAdminUsers$.next(adminUsers);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public createAdmin(params: CreateAdminParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/AdminUser/admins',
        JSON.parse(JSON.stringify(params))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Admin created successfully!'
          );
          this.serviceState$.next(
            AdminManagementServiceActions.SUCCESSFUL_CREATION
          );
          this.getAdminUsers();
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            AdminManagementServiceActions.UNSUCCESSFUL_CREATION
          );
        }
      );
  }

  public deleteAdmin(admin: AdminUser) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete<any>(
        '/cans-backend-rws/Resources/AdminUser/admins/' + admin.adminId
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Admin deleted successfully!'
          );
          this.getAdminUsers();
          this.serviceState$.next(
            AdminManagementServiceActions.SUCCESSFUL_DELETION
          );
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            AdminManagementServiceActions.UNSUCCESSFUL_DELETION
          );
        }
      );
  }
}
