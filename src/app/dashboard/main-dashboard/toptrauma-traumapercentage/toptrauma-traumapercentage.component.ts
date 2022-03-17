/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { ToptraumaTraumapercentageServiceService } from './toptrauma-traumapercentage-service.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';
@Component({
  selector: 'app-toptrauma-traumapercentage',
  templateUrl: './toptrauma-traumapercentage.component.html',
  styleUrls: ['./toptrauma-traumapercentage.component.sass'],
})
export class ToptraumaTraumapercentageComponent implements OnInit {
  public toptraumaTraumapercentageFormGroup: FormGroup;
  selectedOrgs: any[] = []; //every OrgType and OrgName will be a node
  selectedRaces: any[] = [];
  selectedGenders: any[] = [];
  onlyLeafNodes: string[] = []; //here we only pass in the leaf nodes, i.e. OrgNames
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
  organisationString = '';
  organisationStringPrinted = '';
  // Initialise to return all race and gender first
  raceString = 'race=Chinese&race=Malay&race=Indian&race=Others';
  genderString = 'gender=Male&gender=Female';
  messages: Message[] = [];
  color: string = '';
  // eslint-disable-next-line prettier/prettier
  constructor(
    public toptraumaTraumapercentageServiceService: ToptraumaTraumapercentageServiceService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    this.toptraumaTraumapercentageFormGroup = this.formBuilder.group({
      startAge: [
        toptraumaTraumapercentageServiceService.startAge$.value[0]
          .individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        toptraumaTraumapercentageServiceService.endAge$.value[0]
          .individualRangeCode,
        [Validators.required],
      ],
    });
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.toptraumaTraumapercentageServiceService.toptraumaTraumapercentageChartParams$.next(
      this.toptraumaTraumapercentageFormGroup.getRawValue()
    );
    this.messages = [];
    this.toptraumaTraumapercentageServiceService.getGender();
    this.toptraumaTraumapercentageServiceService.getRace();
  }

  logSelectedRaces(): void {
    if (this.selectedRaces.length > 0) {
      this.raceString = '';
      for (let i = 0; i < this.selectedRaces.length; ++i) {
        this.raceString += `race=` + this.selectedRaces[i] + '&';
      }
    }
    this.raceString = this.raceString.substring(0, this.raceString.length - 1);
    this.toptraumaTraumapercentageServiceService.getToptraumaDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
    this.toptraumaTraumapercentageServiceService.getTraumapercentageDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
    console.log(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
  }

  logSelectedGenders(): void {
    this.genderString = '';
    if (this.selectedGenders.length > 0) {
      for (let i = 0; i < this.selectedGenders.length; ++i) {
        this.genderString += `gender=` + this.selectedGenders[i] + '&';
      }
    }
    this.genderString = this.genderString.substring(
      0,
      this.genderString.length - 1
    );
    this.toptraumaTraumapercentageServiceService.getToptraumaDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
    this.toptraumaTraumapercentageServiceService.getTraumapercentageDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
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
      this.organisationString = '';
      this.organisationStringPrinted = '';
      if (this.onlyLeafNodes.length > 0) {
        for (let i = 0; i < this.onlyLeafNodes.length; ++i) {
          this.organisationString +=
            `organisation_name=` + this.onlyLeafNodes[i] + '&';
          this.organisationStringPrinted += this.onlyLeafNodes[i] + ', ';
        }
      }
      this.organisationString = this.organisationString.substring(
        0,
        this.organisationString.length - 1
      );
      this.organisationStringPrinted = this.organisationStringPrinted.substring(
        0,
        this.organisationStringPrinted.length - 2
      );
      this.toptraumaTraumapercentageServiceService.getToptraumaDisplayData(
        this.createFinalString(
          this.organisationString,
          this.raceString,
          this.genderString
        )
      );
      this.toptraumaTraumapercentageServiceService.getTraumapercentageDisplayData(
        this.createFinalString(
          this.organisationString,
          this.raceString,
          this.genderString
        )
      );
    }
  }

  // retrieve from backend while parsing in a list
  covertToServiceStringOrgName(theList: string[]): string {
    this.finalString = '?';
    for (let i = 0; i < theList.length; ++i) {
      this.finalString += `organisation_name=` + theList[i] + '&';
    }
    this.finalString += this.raceString + '&' + this.genderString;
    return this.finalString.substring(0, this.finalString.length);
  }

  createFinalString(
    organisationString: string,
    raceString: string,
    genderString: string
  ): string {
    return '?' + organisationString + '&' + raceString + '&' + genderString;
  }

  updateInformationSelection() {
    const start_age =
      this.toptraumaTraumapercentageFormGroup.get('startAge')?.value;
    const end_age =
      this.toptraumaTraumapercentageFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.toptraumaTraumapercentageServiceService.ageValidator(end_age);

    this.toptraumaTraumapercentageServiceService.toptraumaTraumapercentageChartParams$.next(
      {
        age_group,
      }
    );
  }
  sendColorToService() {
    this.toptraumaTraumapercentageServiceService.logColor(this.color);
  }
}
