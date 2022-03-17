/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { SelectManyOrgServiceService } from './select-many-org-service.service';
import { DashboardChartsService } from '../dashboard-charts.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-select-many-org-checkboxes',
  templateUrl: './select-many-org-checkboxes.component.html',
  styleUrls: ['./select-many-org-checkboxes.component.sass'],
  providers: [MessageService],
})
export class SelectManyOrgCheckboxesComponent implements OnInit {
  public locDistFormGroup: FormGroup;
  selectedOrgs: any[] = []; //every OrgType and OrgName will be a node
  onlyLeafNodes: string[] = []; //here we only pass in the leaf nodes, i.e. OrgNames
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
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
  messages: Message[] = [];
  // eslint-disable-next-line prettier/prettier
  constructor(
    public manyOrgService: SelectManyOrgServiceService,
    public dashboardChartsService: DashboardChartsService,
    private formBuilder: FormBuilder,
    private msgService: MessageService,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.locDistFormGroup = this.formBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startAge: [
        manyOrgService.startAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        manyOrgService.endAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
    this.manyOrgService.getAssessmentTypes();
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.manyOrgService.locChartParams$.next(
      this.locDistFormGroup.getRawValue()
    );
    this.messages = [];
  }

  logSelectedOrgs(): void {
    this.onlyLeafNodes = [];
    this.selectedAssessmentTypes.length <= 0
      ? (this.messages = [
          { severity: 'info', summary: 'Please Select Assessment Type(s)' },
        ])
      : (this.messages = []);
    if (
      this.selectedOrgs.length > 0 &&
      this.selectedAssessmentTypes.length > 0
    ) {
      this.messages = [];
      this.selectedOrgs.forEach((x) => {
        if (x.leaf) {
          this.onlyLeafNodes.push(x.label);
        }
      });
      this.manyOrgService.getDisplayData(
        this.covertToServiceStringOrgName(this.onlyLeafNodes) +
          this.covertToServiceStringAssType(this.selectedAssessmentTypes) //now the service display data would be updated
      );
      this.manyOrgService.getSelectedOrgs(this.selectedOrgs);
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

  covertToServiceStringAssType(theList: string[]): string {
    this.finalString = '&';
    for (let i = 0; i < theList.length; ++i) {
      this.finalString += `assessment_reasons=` + theList[i] + '&';
    }
    return this.finalString.substring(0, this.finalString.length - 1);
  }

  updateInformationSelection() {
    const start_date = this.locDistFormGroup.get('startDate')?.value;
    const end_date = this.locDistFormGroup.get('endDate')?.value;
    const start_age = this.locDistFormGroup.get('startAge')?.value;
    const end_age = this.locDistFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.manyOrgService.ageValidator(end_age);

    this.manyOrgService.locChartParams$.next({
      start_date,
      end_date,
      age_group,
    });
  }
}
