import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { LoginTokenResponse } from './login-token-response';
import { AdminStateService } from '../../services/admin-state.service';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm: FormGroup;
  public showPassword$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public applicationStateService: ApplicationStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private adminStateService: AdminStateService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public login(): void {
    this.applicationStateService.startProcessing();
    const data = this.loginForm.getRawValue();
    this.apiService
      .post<LoginTokenResponse>(
        '/cans-backend-rws/Resources/AdminUser/login',
        data
      )
      .subscribe(
        (response) => {
          this.adminStateService.setToken(response.token);
          this.adminStateService.storeUserData(response.user);
          this.applicationStateService.endProcessing();
          this.router.navigate(['/dashboard']);
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

  public togglePasswordView() {
    if (this.showPassword$.getValue()) {
      this.showPassword$.next(false);
    } else {
      this.showPassword$.next(true);
    }
  }
}
