import { Component, OnInit } from '@angular/core';
import { TypesOrgsDistServiceService } from './types-orgs-dist-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';

@Component({
  selector: 'app-select-many-type-locdist',
  templateUrl: './select-many-type-locdist.component.html',
  styleUrls: ['./select-many-type-locdist.component.sass'],
})
export class SelectManyTypeLocdistComponent implements OnInit {
  selectedTypes: string[] = [];

  lineChartOptions = {
    responsive: true,
    barValueSpacing: 0,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };
  finalString = '?';
  constructor(
    public manyTypesService: TypesOrgsDistServiceService,
    public dashboardChartsService: DashboardChartsService
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  logSelectedTypes(): void {
    if (this.selectedTypes.length > 0) {
      this.manyTypesService.getDisplayData(
        this.covertToServiceString(this.selectedTypes) //now the service display data would be updated
      );
    }
  }

  covertToServiceString(theList: string[]): string {
    this.finalString = '?';
    for (let i = 0; i < theList.length; ++i) {
      this.finalString += `organisation_type=` + theList[i] + '&';
    }
    return this.finalString.substring(0, this.finalString.length - 1);
  }
}
