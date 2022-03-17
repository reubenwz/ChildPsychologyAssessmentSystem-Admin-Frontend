import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AdminUserService } from './admin-user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAdminDialogComponent } from './create-admin-dialog/create-admin-dialog.component';
import { DeleteAdminConfirmationDialogComponent } from './delete-admin-confirmation-dialog/delete-admin-confirmation-dialog.component';
import { AdminUser } from '../../models/admin-user';

@Component({
  selector: 'app-admin-management-module',
  templateUrl: './admin-management-module.component.html',
  styleUrls: ['./admin-management-module.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AdminManagementModuleComponent implements OnInit, OnDestroy {
  private createAdminRef?: DynamicDialogRef;

  constructor(
    public adminUserService: AdminUserService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.adminUserService.getAdminUsers();
  }

  public openCreateAdminDialog() {
    this.createAdminRef = this.dialogService.open(CreateAdminDialogComponent, {
      header: 'Create Admin',
      width: '90%',
      contentStyle: { height: '90vh', overflow: 'auto' },
      baseZIndex: 100,
    });
  }

  public openDeleteDialog(admin: AdminUser) {
    this.createAdminRef = this.dialogService.open(
      DeleteAdminConfirmationDialogComponent,
      {
        header: 'Deleting Admin ' + admin.name,
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: admin,
      }
    );
  }

  ngOnDestroy(): void {
    if (this.createAdminRef) {
      this.createAdminRef.close();
    }
  }
}
