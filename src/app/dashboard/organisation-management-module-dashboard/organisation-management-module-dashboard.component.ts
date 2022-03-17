import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOrganisationDialogComponent } from './create-organisation-dialog/create-organisation-dialog.component';
import { DeleteOrganisationDialogComponent } from './delete-organisation-dialog/delete-organisation-dialog.component';
import { OrganisationManagementService } from './organisation-management.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { OrganisationManagementServiceActions } from './organisation-management-service-actions';

@Component({
  selector: 'app-organisation-management-module-dashboard',
  templateUrl: './organisation-management-module-dashboard.component.html',
  styleUrls: ['./organisation-management-module-dashboard.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class OrganisationManagementModuleDashboardComponent
  implements OnInit, OnDestroy
{
  public selectOrgMessage$: BehaviorSubject<string> =
    new BehaviorSubject<string>('Select Organisation');
  private createOrgRef?: DynamicDialogRef;
  private deleteOrgRef?: DynamicDialogRef;
  private orgServiceSubscription$?: Subscription;
  private routeSubscription$?: Subscription;

  constructor(
    private dialogService: DialogService,
    public organisationManagementService: OrganisationManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public openCreateOrgDialog() {
    this.createOrgRef = this.dialogService.open(
      CreateOrganisationDialogComponent,
      {
        header: 'Create Organisation',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      }
    );
  }

  public openDeleteOrgDialog() {
    this.deleteOrgRef = this.dialogService.open(
      DeleteOrganisationDialogComponent,
      {
        header: 'Delete Organisation',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      }
    );
  }

  public selectOrganisation(organisationId: number) {
    this.organisationManagementService.selectOrganisationById(organisationId);
    this.location.go('/dashboard/organisations/' + organisationId);
  }

  ngOnInit(): void {
    this.orgServiceSubscription$ =
      this.organisationManagementService.serviceState$
        .pipe(
          filter(
            (state) =>
              state ===
              OrganisationManagementServiceActions.SUCCESSFUL_ORG_LIST_LOAD
          )
        )
        .subscribe(() => {
          this.routeSubscription$ = this.route.params.subscribe(
            (routeParams) => {
              const routeId = Number.parseInt(routeParams['id']);
              if (routeId !== null) {
                const org =
                  this.organisationManagementService.getOrgById(routeId);
                if (org) {
                  this.selectOrgMessage$.next(org.name);
                  this.organisationManagementService.selectOrganisation(org);
                }
              }
            }
          );
        });
    this.organisationManagementService.retrieveOrganisations();
  }

  ngOnDestroy(): void {
    if (this.createOrgRef) {
      this.createOrgRef.close();
    }
    if (this.deleteOrgRef) {
      this.deleteOrgRef.close();
    }
    if (this.orgServiceSubscription$) {
      this.orgServiceSubscription$.unsubscribe();
    }
    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
  }
}
