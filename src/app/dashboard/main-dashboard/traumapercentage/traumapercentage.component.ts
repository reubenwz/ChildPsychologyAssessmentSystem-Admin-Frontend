/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { TraumapercentageServiceService } from './traumapercentage-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-traumapercentage',
  templateUrl: './traumapercentage.component.html',
  styleUrls: ['./traumapercentage.component.sass'],
})
export class TraumapercentageComponent implements OnInit {
  public traumapercentageFormGroup: FormGroup;
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
    public traumapercentageService: TraumapercentageServiceService,
    public dashboardChartsService: DashboardChartsService,
    private formBuilder: FormBuilder
  ) {
    this.traumapercentageFormGroup = this.formBuilder.group({
      ageGroup: [
        traumapercentageService.ageGroups$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.traumapercentageService.traumapercentageChartParams$.next(
      this.traumapercentageFormGroup.getRawValue()
    );
    this.messages = [];
    this.updateInformationSelection();
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
      this.traumapercentageService.getDisplayData(
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
    const age_group = this.traumapercentageFormGroup.get('ageGroup')?.value;

    this.traumapercentageService.traumapercentageChartParams$.next({
      age_group,
    });
  }
}
