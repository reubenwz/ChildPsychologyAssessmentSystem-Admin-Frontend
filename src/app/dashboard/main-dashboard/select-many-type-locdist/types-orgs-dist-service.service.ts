import { Injectable } from '@angular/core';
import { LocDistManyTypesResponse } from './locdistribution-selectManyTypesResponse';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TypesOrgsDistServiceService {
  public selectManyTypesResponse$: BehaviorSubject<LocDistManyTypesResponse | null> =
    new BehaviorSubject<LocDistManyTypesResponse | null>(null);
  public selectManyTypesDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) { }
  getDisplayData(orgTypeListParam: string): void {
    this.apiService
      .authenticatedGet<LocDistManyTypesResponse>(
        '/cans-backend-rws/Resources/Dashboard/locdistributionbytype-barchart' +
          orgTypeListParam,
        JSON.parse(JSON.stringify(''))
      )
      .subscribe((response) => {
        this.selectManyTypesResponse$.next(response);
        let listOfListsData = [];
        listOfListsData = [
          {
            data: [] as any,
            label: 'LOC 0',
            backgroundColor: ['rgba(0, 99, 132, 0.2)'],
          },
          {
            data: [] as any,
            label: 'LOC 1',
            backgroundColor: ['rgba(255, 0, 132, 0.2)'],
          },
          {
            data: [] as any,
            label: 'LOC 2',
            backgroundColor: ['rgba(255, 99, 0, 0.2)'],
          },
          {
            data: [] as any,
            label: 'LOC 3',
            backgroundColor: ['rgba(142, 60, 0, 0.2)'],
          },
        ];
        for (let i = 0; i < response.data.length; i++) {
          listOfListsData[0].data.push(response.data[i][0]);
          listOfListsData[1].data.push(response.data[i][1]);
          listOfListsData[2].data.push(response.data[i][2]);
          listOfListsData[3].data.push(response.data[i][3]);
        } //end for
        listOfListsData.forEach((x) => x.data.reverse());
        this.selectManyTypesDisplayData$.next({
          labels: response.labels.reverse(),
          datasets: listOfListsData,
        });
      });
  }
}
