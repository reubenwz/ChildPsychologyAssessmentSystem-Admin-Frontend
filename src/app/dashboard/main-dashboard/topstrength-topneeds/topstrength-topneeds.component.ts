/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { TopstrengthTopneedsServiceService } from './topstrength-topneeds-service.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-topstrength-topneeds',
  templateUrl: './topstrength-topneeds.component.html',
  styleUrls: ['./topstrength-topneeds.component.sass'],
})
export class TopstrengthTopneedsComponent implements OnInit {
  public topstrengthTopneedsFormGroup: FormGroup;
  selectedOrgs: any[] = []; //every OrgType and OrgName will be a node
  selectedRaces: any[] = [];
  selectedGenders: any[] = [];
  onlyLeafNodes: string[] = []; //here we only pass in the leaf nodes, i.e. OrgNames
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
  organisationString =
    'organisation_name=Boys’ Town - Fostering Service&organisation_name=Epworth Foster Care&organisation_name=PPIS Oasis&organisation_name=The Salvation Army, Gracehaven – Fostering';
  organisationStringPrinted = '';
  // Initialise to return all race and gender first
  raceString = 'race=Chinese&race=Malay&race=Indian&race=Others';
  genderString = 'gender=Male&gender=Female';
  messages: Message[] = [];
  color: string = '';
  // eslint-disable-next-line prettier/prettier
  constructor(
    public topstrengthTopneedsServiceService: TopstrengthTopneedsServiceService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.topstrengthTopneedsFormGroup = this.formBuilder.group({
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startAge: [
        topstrengthTopneedsServiceService.startAge$.value[0]
          .individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        topstrengthTopneedsServiceService.endAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.topstrengthTopneedsServiceService.topstrengthTopneedsChartParams$.next(
      this.topstrengthTopneedsFormGroup.getRawValue()
    );
    this.messages = [];
    this.topstrengthTopneedsServiceService.getGender();
    this.topstrengthTopneedsServiceService.getRace();
    //this.initialiseChart();
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
  }

  initialiseChart() {
    this.updateInformationSelection();
    let tempRaceString = 'race=Chinese&race=Indian&race=Others&race=Malay';
    let tempGenderString = 'gender=Female&gender=Male';
    let tempOrganisationString =
      'organisation_name=Boys’ Town - Fostering Service&organisation_name=Epworth Foster Care&organisation_name=PPIS Oasis&organisation_name=The Salvation Army, Gracehaven – Fostering&organisation_name=Boys’ Town - Residential&organisation_name=Chen Su Lan Methodist Children’s Home&organisation_name=Children’s Aid Society, Melrose Home&organisation_name=Darul Ihsan Libanat&organisation_name=Darul Ihsan Orphanage&organisation_name=Gladiolus Place&organisation_name=Jamiyah Children’s Home&organisation_name=Muhammadiyah Welfare Home&organisation_name=MWS Girls’ Residence&organisation_name=Pertapis Centre for Women and Girls&organisation_name=Pertapis Children’s Home&organisation_name=Ramakrishna Mission Boys’ Home&organisation_name=Sunbeam Place&organisation_name=The Salvation Army, Gracehaven&organisation_name=The Salvation Army, Haven&organisation_name=The TENT (Teenagers Experience New Truth)&organisation_name=Chen Su Lan Methodist Children’s Home&organisation_name=Marymount Centre, Ahuva Good Shepherd&organisation_name=Boys’ Town - Residential&organisation_name=Dayspring Residential Treatment Centre&organisation_name=Epworth HSH';
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(
        tempOrganisationString,
        tempRaceString,
        tempGenderString
      )
    );
    this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
      this.createFinalString(
        tempOrganisationString,
        tempRaceString,
        tempGenderString
      )
    );
  }

  logSelectedRaces(): void {
    //this.raceString = '';
    if (this.selectedRaces.length > 0) {
      for (let i = 0; i < this.selectedRaces.length; ++i) {
        this.raceString += `race=` + this.selectedRaces[i] + '&';
      }
    }
    this.raceString = this.raceString.substring(0, this.raceString.length - 1);
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
    this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
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
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(
        this.organisationString,
        this.raceString,
        this.genderString
      )
    );
    this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
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
      this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
        this.createFinalString(
          this.organisationString,
          this.raceString,
          this.genderString
        )
      );
      this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
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
    const start_date =
      this.topstrengthTopneedsFormGroup.get('startDate')?.value;
    const end_date = this.topstrengthTopneedsFormGroup.get('endDate')?.value;
    const start_age = this.topstrengthTopneedsFormGroup.get('startAge')?.value;
    const end_age = this.topstrengthTopneedsFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.topstrengthTopneedsServiceService.ageValidator(end_age);

    this.topstrengthTopneedsServiceService.topstrengthTopneedsChartParams$.next(
      {
        start_date,
        end_date,
        age_group,
      }
    );
  }
  sendColorToService() {
    this.topstrengthTopneedsServiceService.logColor(this.color);
  }
}
