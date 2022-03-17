import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadEntitiesResponse } from './upload-entities-response';
import { UploadEntity } from '../../models/upload-entity';
import { DataUploadRequestParams } from './data-upload-request-params';
import { ApplicationStateService } from '../../services/application-state.service';

@Injectable({
  providedIn: 'root',
})
export class DataUploadService {
  public existingUploads$: BehaviorSubject<UploadEntitiesResponse> =
    new BehaviorSubject<UploadEntitiesResponse>({
      uploads: [],
      total_records: 0,
      current_page: 1,
      last_page: 1,
      per_page: 0,
    });
  public selectedUploads: UploadEntity[] = [];
  public uploadProgress$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public dataUploadParams$: BehaviorSubject<DataUploadRequestParams> =
    new BehaviorSubject<DataUploadRequestParams>({
      page: '1',
      uploadDate: '',
      docDetails: '',
      adminName: '',
    });

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService
  ) {}

  getExistingUploads() {
    this.loadMoreData();
  }

  /**
   * event object params:
   * - first
   * - page (current page, 0 based index)
   * - pageCount (total number of pages)
   * - rows (number of rows being displayed
   * @param event
   */
  loadMoreData(event: any = {}) {
    if (event && event.page !== undefined && event.page !== null) {
      const currentParams = this.dataUploadParams$.getValue();
      currentParams.page = (parseInt(event.page) + 1).toString();
      this.dataUploadParams$.next(currentParams);
    }
    // Cast interface into a generic object
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<UploadEntitiesResponse>(
        '/cans-backend-rws/Resources/DataManagement/data-uploads',
        JSON.parse(JSON.stringify(this.dataUploadParams$.getValue()))
      )
      .subscribe(
        (response) => {
          this.applicationStateService.endProcessing();
          this.existingUploads$.next(response);
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

  doSearch(searchData: DataUploadRequestParams) {
    this.dataUploadParams$.next(searchData);
    this.loadMoreData();
  }

  uploadFile(event: any, fileUpload: any = null) {
    /** @var event.files File[] **/
    this.applicationStateService.startProcessing();
    this.uploadProgress$.next(0);
    this.apiService
      .authenticatedFilePost<UploadEntity>(
        '/cans-backend-rws/Resources/DataManagement/data-upload',
        {},
        event.files[0]
      )
      .subscribe(
        (response) => {
          if (fileUpload) {
            fileUpload.clear();
          }
          if (response.success) {
            this.applicationStateService.showSuccessMessage(
              'File uploaded successfully!'
            );
          } else {
            this.applicationStateService.showSuccessMessage(
              'File uploaded with error, please see below.'
            );
          }
          // Update the currently displayed data by appending at the top
          const currentData = this.existingUploads$.getValue();
          currentData.uploads.unshift(response);
          currentData.total_records = currentData.total_records + 1;
          this.existingUploads$.next(currentData);
        },
        (err: HttpErrorResponse) => {
          if (fileUpload) {
            fileUpload.clear();
          }
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
