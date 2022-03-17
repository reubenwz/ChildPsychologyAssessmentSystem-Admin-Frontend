import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientAssessmentChartResponse } from './client-assessment-chart-response';
import { ApiService } from '../../../services/api.service';
import { ClientAssessmentChartParams } from './client-assessment-chart-params';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientAssessmentServiceService {
  public orgBubblechartResponses$: BehaviorSubject<ClientAssessmentChartResponse | null> =
    new BehaviorSubject<ClientAssessmentChartResponse | null>(null);
  public orgBubblechartDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public ageGroups$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0-6', individualRangeCode: '0-6' },
    { individualRange: '7-13', individualRangeCode: '7-13' },
    { individualRange: '14-17', individualRangeCode: '14-17' },
    { individualRange: '17-20', individualRangeCode: '17-20' },
  ]);
  public clientAssessmentChartParams$: BehaviorSubject<ClientAssessmentChartParams> =
    new BehaviorSubject<ClientAssessmentChartParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
    });
  public orgBubblechartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public orgBubblechartOptionsPresentation$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) {}

  getDisplayData(): void {
    this.clientAssessmentChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<ClientAssessmentChartResponse[]>(
            '/cans-backend-rws/Resources/Dashboard/org-bubblechart',
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            let sets: any[] = [];
            let maxAssessment: number = 0;

            Array.from(response).forEach((obj) => {
              if (obj.numofAssessments > maxAssessment) {
                maxAssessment = obj.numofAssessments;
              }

              const color =
                'rgba(' +
                Math.floor(Math.random() * 255) +
                ',' +
                Math.floor(Math.random() * 255) +
                ',' +
                Math.floor(Math.random() * 255) +
                ',' +
                0.6 +
                ')';

              let tempData = [];
              tempData.push(obj.numOfClients);
              tempData.push(obj.numofAssessments);
              tempData.push(obj.numOfAssessors);
              sets.push({
                label: obj.orgName,
                data: [
                  {
                    x: obj.numOfClients,
                    y: obj.numofAssessments,
                    r: obj.numOfAssessors * 10, // multiply by 10 to make it look bigger
                  },
                ],

                borderColor: color,
                backgroundColor: color,
                clip: false,
              });
            });

            this.orgBubblechartDisplayData$.next({
              labels: '',
              datasets: sets,
            });
            this.orgBubblechartOptions$.next({
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of clients',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of assessments',
                  },
                  max: maxAssessment + 2,
                },
              },
              plugins: {
                title: {
                  text: 'Organisation Bubblechart (Clients, Assessment, Assessors)  **Click on Legend title to remove Organisation Bubble**',

                  display: true,
                },
              },
            });
            this.orgBubblechartOptionsPresentation$.next({
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of clients',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of assessments',
                  },
                  max: maxAssessment + 2,
                },
              },
              plugins: {
                title: {
                  text: 'Organisation Bubblechart (Clients, Assessment, Assessors)',

                  display: true,
                },
                legend: {
                  display: false,
                },
              },
            });
          });
      });
  }
}
