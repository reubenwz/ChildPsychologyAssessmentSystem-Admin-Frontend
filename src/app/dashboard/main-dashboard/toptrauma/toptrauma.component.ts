/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { ToptraumaServiceService } from './toptrauma-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-toptrauma',
  templateUrl: './toptrauma.component.html',
  styleUrls: ['./toptrauma.component.sass'],
})
export class ToptraumaComponent implements OnInit {
  public toptraumaFormGroup: FormGroup;
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
    public toptraumaService: ToptraumaServiceService,
    public dashboardChartsService: DashboardChartsService,
    private formBuilder: FormBuilder
  ) {
    this.toptraumaFormGroup = this.formBuilder.group({
      ageGroup: [
        toptraumaService.ageGroups$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.toptraumaService.toptraumaChartParams$.next(
      this.toptraumaFormGroup.getRawValue()
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
      this.toptraumaService.getDisplayData(
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
    const age_group = this.toptraumaFormGroup.get('ageGroup')?.value;

    this.toptraumaService.toptraumaChartParams$.next({
      age_group,
    });
  }
}
