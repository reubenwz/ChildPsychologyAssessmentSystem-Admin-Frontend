import { Component, OnInit } from '@angular/core';
import { ClientAssessmentServiceService } from '../client-assessment/client-assessment-service.service';
import { SelectManyOrgServiceService } from '../select-many-org-checkboxes/select-many-org-service.service';

@Component({
  selector: 'app-summary-charts',
  templateUrl: './summary-charts.component.html',
  styleUrls: ['./summary-charts.component.sass'],
})
export class SummaryChartsComponent implements OnInit {
  selectedOrgs: any[];
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    barValueSpacing: 0,
    scales: {
      y: {
        ticks: {
          min: 0,
        },
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
        text: 'LOC Distribution',
      },
    },
  };
  constructor(
    public clientAssessmentService: ClientAssessmentServiceService,
    public manyOrgService: SelectManyOrgServiceService
  ) {
    this.selectedOrgs = manyOrgService.selectedOrgs;
  }

  ngOnInit(): void {}
}
