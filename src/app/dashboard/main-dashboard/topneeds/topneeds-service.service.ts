import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopneedsChartResponse } from './topneeds-chart-response';
import { ApiService } from '../../../services/api.service';
import { TopneedsChartParams } from './topneeds-chart-params';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopneedsServiceService {
  public topneedsResponse$: BehaviorSubject<TopneedsChartResponse | null> =
    new BehaviorSubject<TopneedsChartResponse | null>(null);
  public topneedsDisplayData$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public ageGroups$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0-6', individualRangeCode: '0-6' },
    { individualRange: '7-13', individualRangeCode: '7-13' },
    { individualRange: '14-17', individualRangeCode: '14-17' },
    { individualRange: '17-20', individualRangeCode: '17-20' },
  ]);
  public topneedsChartParams$: BehaviorSubject<TopneedsChartParams> =
    new BehaviorSubject<TopneedsChartParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
      age_group: '',
    });
  public topneedsBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public treeSelectData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );

  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) {
    this.getOrganisationTypes();
  }

  getOrganisationTypes() {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/Dashboard/organisation-types'
      )
      .subscribe(
        (response) => {
          const organisationsTypesAndOrgsDict: any[] = [];

          response.organisations.forEach((x: any) =>
            organisationsTypesAndOrgsDict.push(x)
          );

          const organisationTypesList: any[] = []; // for TreeSelect

          organisationsTypesAndOrgsDict.forEach((data: any) => {
            let listOfTreeLeafObjects: any[] = [];
            data.organisations.forEach((element: string) => {
              listOfTreeLeafObjects.push({
                label: element,
                data: element,
                leaf: true,
                collapsedIcon: 'pi pi-chart-bar',
              });
            });
            organisationTypesList.push({
              label: data.type,
              data: data,
              expandedIcon: 'pi pi-folder-open',
              collapsedIcon: 'pi pi-folder',
              children: listOfTreeLeafObjects,
              leaf: false,
            });
          });
          this.treeSelectData.next(organisationTypesList);
        }, //end response handling
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        } //end error handling
      );
  }

  getDisplayData(orgListParam: string): void {
    this.topneedsChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<TopneedsChartResponse>(
            '/cans-backend-rws/Resources/Dashboard/topneeds-barchart' +
              orgListParam,
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            this.topneedsResponse$.next(response);
            this.topneedsDisplayData$.next({
              labels: response.labels,
              datasets: [
                {
                  data: response.data,
                  backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                },
              ],
            });
            this.topneedsBarChartOptions$.next({
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Need',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of needs',
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
          });
      });
  }
}
