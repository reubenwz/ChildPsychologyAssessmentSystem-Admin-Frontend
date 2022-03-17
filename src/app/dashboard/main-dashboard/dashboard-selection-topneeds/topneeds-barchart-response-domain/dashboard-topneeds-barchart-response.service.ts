import { Injectable } from '@angular/core';
import { DashboardChartsService } from '../../dashboard-charts.service';
import { ApiService } from '../../../../services/api.service';
import { TopneedsBarchartResponseDomainResponse } from './topneeds-barchart-response-domain-response';
import { BehaviorSubject } from 'rxjs';
import { TopneedsBarchartResponseDomainParams } from './topneeds-barchart-response-domain-params';

@Injectable({
  providedIn: 'root',
})
export class DashboardTopneedsBarchartResponseService {
  public topNeedsBarChartResponse$: BehaviorSubject<TopneedsBarchartResponseDomainResponse | null> =
    new BehaviorSubject<TopneedsBarchartResponseDomainResponse | null>(null);
  public topNeedsBarChartDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public topNeedsBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  constructor(
    private dashboardChartsService: DashboardChartsService,
    private apiService: ApiService
  ) {}

  public retrieveInformation(params: TopneedsBarchartResponseDomainParams) {
    this.apiService
      .authenticatedGetWithArrayParams<TopneedsBarchartResponseDomainResponse>(
        '/cans-backend-rws/Resources/Dashboard/topneeds-barchart/',
        JSON.parse(JSON.stringify(params))
      )
      .subscribe(
        (response) => {
          this.topNeedsBarChartResponse$.next(response);
          this.topNeedsBarChartDisplayData$.next({
            labels: response.labels,
            datasets: [
              {
                data: response.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
              },
            ],
          });
          this.topNeedsBarChartOptions$.next({
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Needs',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Number of Needs',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: response.title,
              },
            },
          });
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.dashboardChartsService.errorMessage$.next(
              errorMessageInJson.error
            );
          } else {
            this.dashboardChartsService.errorMessage$.next(err.message);
          }
        }
      );
  }
}
