import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToptraumaChartResponse } from './toptrauma-chart-response';
import { ApiService } from '../../../services/api.service';
import { ToptraumaChartParams } from './toptrauma-chart-params';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToptraumaServiceService {
  public toptraumaResponse$: BehaviorSubject<ToptraumaChartResponse | null> =
    new BehaviorSubject<ToptraumaChartResponse | null>(null);
  public toptraumaDisplayData$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public ageGroups$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0-6', individualRangeCode: '0-6' },
    { individualRange: '7-13', individualRangeCode: '7-13' },
    { individualRange: '14-17', individualRangeCode: '14-17' },
    { individualRange: '17-20', individualRangeCode: '17-20' },
  ]);
  public toptraumaChartParams$: BehaviorSubject<ToptraumaChartParams> =
    new BehaviorSubject<ToptraumaChartParams>({
      age_group: '',
    });
  public toptraumaBarChartOptions$: BehaviorSubject<any> =
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
    this.toptraumaChartParams$.subscribe((params) => {
      this.apiService
        .authenticatedGet<ToptraumaChartResponse>(
          '/cans-backend-rws/Resources/Dashboard/toptrauma-barchart' +
            orgListParam,
          JSON.parse(JSON.stringify(params))
        )
        .subscribe((response) => {
          this.toptraumaResponse$.next(response);
          this.toptraumaDisplayData$.next({
            labels: response.labels,
            datasets: [
              {
                data: response.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
              },
            ],
          });
          this.toptraumaBarChartOptions$.next({
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Trauma',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Number of Traumas',
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
