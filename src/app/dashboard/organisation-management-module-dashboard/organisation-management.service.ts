import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CreateOrganisationParams } from './create-organisation-dialog/create-organisation-params';
import { ApiService } from '../../services/api.service';
import { Organisation } from '../../models/organisation';
import { GenericLabelValue } from '../../models/generic-label-value';
import { OrganisationManagementServiceActions } from './organisation-management-service-actions';
import { ApplicationStateService } from '../../services/application-state.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationManagementService {
  public readonly selectedOrganisation$: BehaviorSubject<Organisation | null> =
    new BehaviorSubject<Organisation | null>(null);
  public readonly organisations$: BehaviorSubject<Organisation[]> =
    new BehaviorSubject<Organisation[]>([]);
  public readonly organisationTypes$: BehaviorSubject<GenericLabelValue[]> =
    new BehaviorSubject<GenericLabelValue[]>([]);
  public readonly serviceState$: Subject<OrganisationManagementServiceActions> =
    new Subject<OrganisationManagementServiceActions>();

  constructor(
    private applicationStateService: ApplicationStateService,
    private apiService: ApiService
  ) {}

  public retrieveOrganisations() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Organisation[]>(
        '/cans-backend-rws/Resources/AssessorManagement-AdminSystem/organisations'
      )
      .subscribe(
        (response) => {
          this.applicationStateService.endProcessing();
          this.organisations$.next(response);
          this.serviceState$.next(
            OrganisationManagementServiceActions.SUCCESSFUL_ORG_LIST_LOAD
          );
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public retrieveOrganisationTypes() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<string[]>(
        '/cans-backend-rws/Resources/AssessorManagement-AdminSystem/organisation-types'
      )
      .subscribe(
        (response) => {
          this.applicationStateService.endProcessing();
          const organisationTypes: GenericLabelValue[] = [];
          response.forEach((value) => {
            organisationTypes.push({ label: value, value: value });
          });
          this.organisationTypes$.next(organisationTypes);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public createOrganisation(orgDetails: CreateOrganisationParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost(
        '/cans-backend-rws/Resources/AssessorManagement-AdminSystem/organisations',
        JSON.parse(JSON.stringify(orgDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Organisation created successfully!'
          );
          this.retrieveOrganisations();
          this.serviceState$.next(
            OrganisationManagementServiceActions.SUCCESSFUL_CREATION
          );
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            OrganisationManagementServiceActions.UNSUCCESSFUL_CREATION
          );
        }
      );
  }

  public deleteOrganisation(organisationId: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete(
        '/cans-backend-rws/Resources/AssessorManagement-AdminSystem/organisations/' +
          organisationId
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Organisation deleted successfully!'
          );
          this.retrieveOrganisations();
          this.selectOrganisation(null);
          this.serviceState$.next(
            OrganisationManagementServiceActions.SUCCESSFUL_DELETION
          );
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            OrganisationManagementServiceActions.UNSUCCESSFUL_DELETION
          );
        }
      );
  }

  public selectOrganisation(organisation: Organisation | null) {
    this.selectedOrganisation$.next(organisation);
  }

  public selectOrganisationById(organisationId: number) {
    this.selectOrganisation(this.getOrgById(organisationId));
  }

  public getOrgById(organisationId: number): Organisation | null {
    const organisations = this.organisations$.value;

    if (organisations) {
      const foundOrganisation = organisations.find(
        (org) => org.organisationId === organisationId
      );
      if (foundOrganisation) {
        return foundOrganisation;
      }
    }

    return null;
  }
}
