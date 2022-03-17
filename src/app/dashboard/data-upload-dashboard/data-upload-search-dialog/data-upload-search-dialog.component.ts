import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-upload-search-dialog',
  templateUrl: './data-upload-search-dialog.component.html',
  styleUrls: ['./data-upload-search-dialog.component.sass'],
})
export class DataUploadSearchDialogComponent implements OnInit {
  public dataUploadSearchForm: FormGroup;

  constructor(private ref: DynamicDialogRef, private formBuilder: FormBuilder) {
    this.dataUploadSearchForm = this.formBuilder.group({
      uploadDate: [''],
      docDetails: [''],
      adminName: [''],
    });
  }

  ngOnInit(): void {}

  doSearch() {
    this.ref.close(this.dataUploadSearchForm.getRawValue());
  }

  resetSearch() {
    // Do not use .reset on form as it causes null values
    this.dataUploadSearchForm = this.formBuilder.group({
      uploadDate: [''],
      docDetails: [''],
      adminName: [''],
    });
    this.doSearch();
  }
}
