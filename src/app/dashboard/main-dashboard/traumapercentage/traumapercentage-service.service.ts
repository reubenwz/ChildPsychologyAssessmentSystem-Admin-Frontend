import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TraumapercentageChartResponse } from './traumapercentage-chart-response';
import { ApiService } from '../../../services/api.service';
import { TraumapercentageChartParams } from './traumapercentage-chart-params';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TraumapercentageServiceService {
  public traumapercentageResponse$: BehaviorSubject<TraumapercentageChartResponse | null> =
    new BehaviorSubject<TraumapercentageChartResponse | null>(null);
  public traumapercentageDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public ageGroups$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0-6', individualRangeCode: '0-6' },
    { individualRange: '7-13', individualRangeCode: '7-13' },
    { individualRange: '14-17', individualRangeCode: '14-17' },
    { individualRange: '17-20', individualRangeCode: '17-20' },
  ]);
  public traumapercentageChartParams$: BehaviorSubject<TraumapercentageChartParams> =
    new BehaviorSubject<TraumapercentageChartParams>({
      age_group: '',
    });
  public traumapercentageBarChartOptions$: BehaviorSubject<any> =
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
    this.traumapercentageChartParams$.subscribe((params) => {
      this.apiService
        .authenticatedGet<TraumapercentageChartResponse>(
          '/cans-backend-rws/Resources/Dashboard/traumapercentage-barchart' +
            orgListParam,
          JSON.parse(JSON.stringify(params))
        )
        .subscribe((response) => {
          this.traumapercentageResponse$.next(response);
          this.traumapercentageDisplayData$.next({
            labels: response.labels,
            datasets: [
              {
                data: response.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
              },
            ],
          });
          this.traumapercentageBarChartOptions$.next({
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Number of Traumas',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Trauma Percentage',
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
