import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardTopneedsBarchartResponseService } from './topneeds-barchart-response-domain/dashboard-topneeds-barchart-response.service';

@Component({
  selector: 'app-dashboard-selection-topneeds',
  templateUrl: './dashboard-selection-topneeds.component.html',
  styleUrls: ['./dashboard-selection-topneeds.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSelectionTopneedsComponent implements OnInit {
  public dashboardSelectionForm: FormGroup;

  constructor(
    public dashboardChartsService: DashboardChartsService,
    private dashboardTopneedsBarchartResponseService: DashboardTopneedsBarchartResponseService,
    private formBuilder: FormBuilder
  ) {
    const dateNow = new Date();
    let startDate = new Date();
    if (dateNow.getUTCMonth() <= 5) {
      // Decrease by a 1 year
      startDate = new Date(
        startDate.setUTCFullYear(dateNow.getUTCFullYear() - 1)
      );
    }
    startDate = new Date(
      startDate.setUTCMonth(Math.abs(dateNow.getUTCMonth() - 6))
    );
    this.dashboardSelectionForm = this.formBuilder.group({
      start_date: [startDate, [Validators.required]],
      end_date: [dateNow, [Validators.required]],
      age_group: [
        dashboardChartsService.ageGroups$.value[0].individualRangeCode,
        [Validators.required],
      ],
      organisation_name: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateInformationSelection();
  }

  public updateInformationSelection() {
    if (!this.dashboardSelectionForm.invalid) {
      const data = {
        start_date: this.dashboardSelectionForm.get('start_date')?.value,
        end_date: this.dashboardSelectionForm.get('end_date')?.value,
        age_group: this.dashboardSelectionForm.get('age_group')?.value,
        organisation_name:
          this.dashboardSelectionForm.get('organisation_name')?.value,
      };
      this.dashboardTopneedsBarchartResponseService.retrieveInformation(data);
    }
  }
}
