import { Component, OnInit } from '@angular/core';
import { DashboardTopneedsBarchartResponseService } from './dashboard-topneeds-barchart-response.service';

@Component({
  selector: 'app-topneeds-barchart-response-domain',
  templateUrl: './topneeds-barchart-response-domain.component.html',
  styleUrls: ['./topneeds-barchart-response-domain.component.sass'],
})
export class TopneedsBarchartResponseDomainComponent implements OnInit {
  constructor(
    public dashboardTopneedsBarchartResponseService: DashboardTopneedsBarchartResponseService
  ) {}

  ngOnInit(): void {}
}
