import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { LocDistBarchartResponseDomainResponse } from './locdistribution-barchart-response';
import { LocdistributionBarchartService } from './locdistribution-barchart.service';
@Component({
  selector: 'app-locdistribution-barchart',
  templateUrl: './locdistribution-barchart.component.html',
  styleUrls: ['./locdistribution-barchart.component.sass'],
})
export class LocdistributionBarchartComponent implements OnInit {
  labels?: LocDistBarchartResponseDomainResponse[];
  dataLabel?: '';
  data?: LocDistBarchartResponseDomainResponse[];
  title?: '';
  constructor(public locDistBarchartService: LocdistributionBarchartService) {
    this.labels =
      this.locDistBarchartService.locDistBarChartResponse$.value?.labels;
    this.data =
      this.locDistBarchartService.locDistBarChartResponse$.value?.data;
    this.dataLabel =
      this.locDistBarchartService.locDistBarChartResponse$.value?.dataLabel;
    this.title =
      this.locDistBarchartService.locDistBarChartResponse$.value?.title;
  }

  ngOnInit(): void {}
}
