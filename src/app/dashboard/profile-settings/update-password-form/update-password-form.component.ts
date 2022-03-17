import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UpdatePasswordResponse } from './update-password-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationStateService } from '../../../services/application-state.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordFormComponent {
  public updatePasswordForm: FormGroup;
  public showOldPassword$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showNewPassword$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    public applicationStateService: ApplicationStateService,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.updatePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(5)]],
      new_password_confirm: [
        '',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  public passwordMatches(): boolean {
    return (
      this.updatePasswordForm.get('new_password')?.value ===
      this.updatePasswordForm.get('new_password_confirm')?.value
    );
  }

  updatePassword() {
    this.applicationStateService.startProcessing();
    const newPassword = this.updatePasswordForm.get('new_password')?.value;

    const data = {
      old_password: this.updatePasswordForm.get('old_password')?.value,
      new_password: newPassword,
    };
    this.apiService
      .authenticatedPost<UpdatePasswordResponse>(
        '/cans-backend-rws/Resources/AdminUser/password-reset-internal',
        data
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
          // Clear form after using
          this.updatePasswordForm.reset();
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

  public toggleOldPasswordView() {
    if (this.showOldPassword$.getValue()) {
      this.showOldPassword$.next(false);
    } else {
      this.showOldPassword$.next(true);
    }
  }

  public toggleNewPasswordView() {
    if (this.showNewPassword$.getValue()) {
      this.showNewPassword$.next(false);
    } else {
      this.showNewPassword$.next(true);
    }
  }
}
