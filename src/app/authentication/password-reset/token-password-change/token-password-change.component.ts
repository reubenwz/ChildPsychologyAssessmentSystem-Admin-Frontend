import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationStateService } from '../../../services/application-state.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-token-password-change',
  templateUrl: './token-password-change.component.html',
  styleUrls: [
    './token-password-change.component.sass',
    '../password-reset.component.sass',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenPasswordChangeComponent {
  public tokenPasswordResetForm: FormGroup;
  public showPassword$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.tokenPasswordResetForm = this.formBuilder.group({
      reset_id: [routeId, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public passwordMatches(): boolean {
    return (
      this.tokenPasswordResetForm.get('password')?.value ===
      this.tokenPasswordResetForm.get('confirm_password')?.value
    );
  }

  public changePassword() {
    this.applicationStateService.startProcessing();

    const firstPassword = this.tokenPasswordResetForm.get('password')?.value;

    const data = {
      password: firstPassword,
    };

    this.apiService
      .post<any>(
        '/cans-backend-rws/Resources/AdminUser/password-resets/' +
          this.tokenPasswordResetForm.get('reset_id')?.value,
        data
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
          // Clear form after using
          this.tokenPasswordResetForm.reset();
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

  public togglePasswordView() {
    if (this.showPassword$.getValue()) {
      this.showPassword$.next(false);
    } else {
      this.showPassword$.next(true);
    }
  }
}
