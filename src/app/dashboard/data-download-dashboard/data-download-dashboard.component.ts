import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataDownloadResponse } from './data-download-response';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-data-download-dashboard',
  templateUrl: './data-download-dashboard.component.html',
  styleUrls: ['./data-download-dashboard.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDownloadDashboardComponent {
  public dataDownloadForm: FormGroup;
  public downloadUrl$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.dataDownloadForm = this.formBuilder.group({
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
    });
  }

  public initiateDownload() {
    const isoStartDate = JSON.parse(
      JSON.stringify(this.dataDownloadForm.get('start_date')?.value)
    );
    const isoEndDate = JSON.parse(
      JSON.stringify(this.dataDownloadForm.get('end_date')?.value)
    );

    const data = {
      start_date: isoStartDate,
      end_date: isoEndDate,
    };
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<DataDownloadResponse>(
        '/cans-backend-rws/Resources/DataManagement/data-download',
        data
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(
            'Download generated successfully!'
          );
          this.downloadUrl$.next(response.url);
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
          this.downloadUrl$.next(null);
        }
      );
  }
}
