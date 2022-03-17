import { Component, OnInit } from '@angular/core';
import { ClientAssessmentServiceService } from './client-assessment-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-client-assessment',
  templateUrl: './client-assessment.component.html',
  styleUrls: ['./client-assessment.component.sass'],
})
export class ClientAssessmentComponent implements OnInit {
  public clientAssessmentFormGroup: FormGroup;
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
  messages: Message[] = [];
  // eslint-disable-next-line prettier/prettier
  constructor(
    public clientAssessmentService: ClientAssessmentServiceService,
    public dashboardChartsService: DashboardChartsService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.clientAssessmentFormGroup = this.formBuilder.group({
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.messages = new Array();
    this.clientAssessmentService.clientAssessmentChartParams$.next(
      this.clientAssessmentFormGroup.getRawValue()
    );
    this.messages = [];
    this.updateInformationSelection();
  }

  updateInformationSelection() {
    const start_date = this.clientAssessmentFormGroup.get('startDate')?.value;
    const end_date = this.clientAssessmentFormGroup.get('endDate')?.value;

    this.clientAssessmentService.clientAssessmentChartParams$.next({
      start_date,
      end_date,
    });
    this.clientAssessmentService.getDisplayData();
  }
}
