import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataUploadService } from './data-upload.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataUploadSearchDialogComponent } from './data-upload-search-dialog/data-upload-search-dialog.component';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-data-upload-dashboard',
  templateUrl: './data-upload-dashboard.component.html',
  styleUrls: ['./data-upload-dashboard.component.sass'],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataUploadDashboardComponent implements OnInit, OnDestroy {
  private ref?: DynamicDialogRef;

  constructor(
    public dataUploadService: DataUploadService,
    public applicationStateService: ApplicationStateService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.dataUploadService.getExistingUploads();
  }

  openSearchModal() {
    this.ref = this.dialogService.open(DataUploadSearchDialogComponent, {
      header: 'Data Upload Search',
      width: '70%',
      contentStyle: { height: '80vh', overflow: 'auto' },
      baseZIndex: 100,
    });

    this.ref.onClose.subscribe((searchData: any) => {
      if (searchData) {
        if (searchData.uploadDate && searchData.uploadDate !== '') {
          searchData.uploadDate = JSON.parse(
            JSON.stringify(searchData.uploadDate)
          );
        }
        searchData.page = 1;

        this.dataUploadService.doSearch(searchData);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
