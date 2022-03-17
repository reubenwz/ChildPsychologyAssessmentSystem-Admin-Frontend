import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent {
  public passwordResetForm: FormGroup;

  constructor(
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public resetPassword() {
    this.applicationStateService.startProcessing();

    const data = {
      email: this.passwordResetForm.get('email')?.value,
    };

    this.apiService
      .post<any>('/cans-backend-rws/Resources/AdminUser/password-reset', data)
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
          // Clear form after using
          this.passwordResetForm.reset();
        },
        (err: HttpErrorResponse) => {
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
}
