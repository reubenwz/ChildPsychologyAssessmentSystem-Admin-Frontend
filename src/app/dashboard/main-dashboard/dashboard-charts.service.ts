import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardChartsParams } from './dashboard-charts-params';
import { ApiService } from '../../services/api.service';
import { OrganisationDataLabel } from './organisation-data-label';

@Injectable({
  providedIn: 'root',
})
export class DashboardChartsService {
  /**
   * TODO: Can we fetch age groups from database? See age group category
   */
  public ageGroups$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0-6', individualRangeCode: '0-6' },
    { individualRange: '7-13', individualRangeCode: '7-13' },
    { individualRange: '14-17', individualRangeCode: '14-17' },
    { individualRange: '17-20', individualRangeCode: '17-20' },
  ]);
  public organisationNames$: BehaviorSubject<OrganisationDataLabel[]> =
    new BehaviorSubject<OrganisationDataLabel[]>([]);
  public organisationTypes$: BehaviorSubject<OrganisationDataLabel[]> =
    new BehaviorSubject<OrganisationDataLabel[]>([]);
  // TODO: Remove usage of dashboardChartsParams$ from all components
  public dashboardChartsParams$: BehaviorSubject<DashboardChartsParams> =
    new BehaviorSubject<DashboardChartsParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
      age_group: '',
      organisation_name: '',
    });
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private apiService: ApiService) {
    // this.retrieveOrganisations();
    // this.retrieveOrganisationTypes();
  }

  retrieveOrganisations() {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/Dashboard/organisations'
      )
      .subscribe(
        (response) => {
          const organisations = response.organisations;
          const organisationList: OrganisationDataLabel[] = [];
          organisations.forEach((data: string) => {
            organisationList.push({ name: data, nameCode: data });
          });
          this.organisationNames$.next(organisationList);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }

  retrieveOrganisationTypes() {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/Dashboard/organisation-types'
      )
      .subscribe(
        (response) => {
          const organisationsTypes = response.organisations;
          const organisationTypesList: OrganisationDataLabel[] = [];
          organisationsTypes.forEach((data: string) => {
            organisationTypesList.push({ name: data, nameCode: data });
          });
          this.organisationTypes$.next(organisationTypesList);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }
}
