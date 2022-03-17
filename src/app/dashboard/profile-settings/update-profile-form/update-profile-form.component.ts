import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AdminUser } from '../../../models/admin-user';
import { GendersService } from '../../../services/genders.service';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProfileFormComponent implements OnInit {
  public adminUser$: BehaviorSubject<AdminUser | null> =
    new BehaviorSubject<AdminUser | null>(null);
  public updateProfileForm: FormGroup;

  constructor(
    public applicationStateService: ApplicationStateService,
    public gendersService: GendersService,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.apiService
      .authenticatedGet<AdminUser>(
        '/cans-backend-rws/Resources/AdminUser/get-detail'
      )
      .subscribe(
        (response) => {
          this.updateProfileForm.setValue({
            name: response.name,
            dob: new Date(response.dob || ''),
            gender: response.gender,
          });
          this.adminUser$.next(response);
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

  updateProfile() {
    this.applicationStateService.startProcessing();
    const data = {
      name: this.updateProfileForm.get('name')?.value,
      dob: this.updateProfileForm.get('dob')?.value,
      gender: this.updateProfileForm.get('gender')?.value,
    };
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/AdminUser/detail-change',
        data
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
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
}
