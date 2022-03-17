import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarItem } from './navbar-item';
import { AdminStateService } from './admin-state.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public visible: boolean = true;
  public readonly items$: BehaviorSubject<NavbarItem[]> = new BehaviorSubject<
    NavbarItem[]
  >(NavbarService.nonRootAdminURLs);
  private static rootAdminURLs: NavbarItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Admins',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/admins',
    },
    {
      label: 'Organisations',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/organisations',
    },
    {
      label: 'Clients',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/clients',
    },
    {
      label: 'Upload Data',
      icon: 'pi pi-fw pi-upload',
      routerLink: '/dashboard/data-upload',
    },
    {
      label: 'Download Data',
      icon: 'pi pi-fw pi-download',
      routerLink: '/dashboard/data-download',
    },
    {
      label: 'Assessments',
      icon: 'pi pi-fw pi-pencil',
      routerLink: '/dashboard/assessments',
    },
    {
      label: 'Assessment Questions',
      icon: 'pi pi-fw pi-pencil',
      routerLink: '/dashboard/questions',
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/dashboard/profile-settings',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: '/auth/logout',
    },
  ];

  private static nonRootAdminURLs: NavbarItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Organisations',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/organisations',
    },
    {
      label: 'Clients',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/clients',
    },
    {
      label: 'Upload Data',
      icon: 'pi pi-fw pi-upload',
      routerLink: '/dashboard/data-upload',
    },
    {
      label: 'Download Data',
      icon: 'pi pi-fw pi-download',
      routerLink: '/dashboard/data-download',
    },
    {
      label: 'Assessments',
      icon: 'pi pi-fw pi-pencil',
      routerLink: '/dashboard/assessments',
    },
    {
      label: 'Assessment Questions',
      icon: 'pi pi-fw pi-pencil',
      routerLink: '/dashboard/questions',
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/dashboard/profile-settings',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: '/auth/logout',
    },
  ];

  constructor(private adminStateService: AdminStateService) {
    this.updateUrl();
    this.adminStateService.loggedInUserStateChange$.subscribe(() => {
      this.updateUrl();
    });
  }

  private updateUrl() {
    const adminUser = this.adminStateService.retrieveUserData();
    if (adminUser) {
      if (adminUser.adminId) {
        if (adminUser.root) {
          this.items$.next(NavbarService.rootAdminURLs);
          return;
        }

        this.items$.next(NavbarService.nonRootAdminURLs);
      } else {
        this.items$.next([]);
        this.hideMenu();
      }
    }
  }

  public showMenu(): void {
    this.visible = true;
  }

  public hideMenu(): void {
    this.visible = false;
  }
}
