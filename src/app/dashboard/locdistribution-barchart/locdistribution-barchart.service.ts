import { Injectable } from '@angular/core';
import { DashboardChartsService } from 'src/app/dashboard/main-dashboard/dashboard-charts.service';
import { ApiService } from 'src/app/services/api.service';
import { LocDistBarchartResponseDomainResponse } from './locdistribution-barchart-response';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocdistributionBarchartService {
  public locDistBarChartResponse$: BehaviorSubject<LocDistBarchartResponseDomainResponse | null> =
    new BehaviorSubject<LocDistBarchartResponseDomainResponse | null>(null);
  public locDistBarChartDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  constructor(
    private dashboardChartsService: DashboardChartsService,
    private apiService: ApiService
  ) {
    this.dashboardChartsService.dashboardChartsParams$.subscribe((params) => {
      this.apiService
        .authenticatedGet<LocDistBarchartResponseDomainResponse>(
          '/cans-backend-rws/Resources/Dashboard/locdistribution-barchart',
          JSON.parse(JSON.stringify(params))
        )
        .subscribe(
          (response) => {
            this.locDistBarChartResponse$.next(response);
            this.locDistBarChartDisplayData$.next(response.data);
          },
          (err) => {
            if (err.status === 409) {
              const errorMessageInJson: any = err.error;
              dashboardChartsService.errorMessage$.next(
                errorMessageInJson.error
              );
            } else {
              dashboardChartsService.errorMessage$.next(err.message);
            }
          }
        );
    });
  }
}
