/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { TopneedsServiceService } from './topneeds-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-topneeds',
  templateUrl: './topneeds.component.html',
  styleUrls: ['./topneeds.component.sass'],
})
export class TopneedsComponent implements OnInit {
  public topneedsFormGroup: FormGroup;
  selectedOrgs: any[] = []; //every OrgType and OrgName will be a node
  onlyLeafNodes: string[] = []; //here we only pass in the leaf nodes, i.e. OrgNames
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
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
    public topneedsService: TopneedsServiceService,
    public dashboardChartsService: DashboardChartsService,
    private formBuilder: FormBuilder
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.topneedsFormGroup = this.formBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      ageGroup: [
        topneedsService.ageGroups$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.topneedsService.topneedsChartParams$.next(
      this.topneedsFormGroup.getRawValue()
    );
    this.messages = [];
  }

  logSelectedOrgs(): void {
    this.onlyLeafNodes = [];
    if (this.selectedOrgs.length > 0) {
      this.messages = [];
      this.selectedOrgs.forEach((x) => {
        if (x.leaf) {
          this.onlyLeafNodes.push(x.label);
        }
      });
      this.topneedsService.getDisplayData(
        this.covertToServiceStringOrgName(this.onlyLeafNodes)
      );
    }
  }

  // retrieve from backend while parsing in a list
  covertToServiceStringOrgName(theList: string[]): string {
    this.finalString = '?';
    for (let i = 0; i < theList.length; ++i) {
      this.finalString += `organisation_name=` + theList[i] + '&';
    }
    return this.finalString.substring(0, this.finalString.length - 1);
  }

  updateInformationSelection() {
    const start_date = this.topneedsFormGroup.get('startDate')?.value;
    const end_date = this.topneedsFormGroup.get('endDate')?.value;
    const age_group = this.topneedsFormGroup.get('ageGroup')?.value;

    this.topneedsService.topneedsChartParams$.next({
      start_date,
      end_date,
      age_group,
    });
  }
}
