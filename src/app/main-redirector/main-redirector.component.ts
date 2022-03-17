import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminStateService } from '../services/admin-state.service';

@Component({
  selector: 'app-main-redirector',
  templateUrl: './main-redirector.component.html',
  styleUrls: ['./main-redirector.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainRedirectorComponent implements OnInit {
  constructor(
    private adminStateService: AdminStateService,
    private router: Router
  ) {}

  /**
   * Redirect the user based on their token status
   * Logged in user -> go to dashboard
   * Not logged in user -> go to login
   */
  ngOnInit(): void {
    this.adminStateService.hasToken().subscribe((result) => {
      if (result) {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      }
    });
  }
}
