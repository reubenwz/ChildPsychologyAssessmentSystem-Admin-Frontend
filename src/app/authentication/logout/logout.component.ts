import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminStateService } from '../../services/admin-state.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private adminStateService: AdminStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminStateService
      .getToken()
      .pipe(
        first(),
        switchMap((token) =>
          this.apiService.authenticatedDelete<any>(
            '/cans-backend-rws/Resources/AdminUser/token/' + token
          )
        )
      )
      .subscribe(
        () => {
          // Successful, token deleted from server
          this.adminStateService.clearToken();
          this.adminStateService.clearUserData();
          this.router.navigate(['/']);
        },
        () => {
          // Not successful, token might have already expired, clear it from client storage
          this.adminStateService.clearToken();
          this.router.navigate(['/']);
          this.adminStateService.clearUserData();
        }
      );
  }
}
