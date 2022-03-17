import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { AdminStateService } from '../../services/admin-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(
    public navbarService: NavbarService,
    public adminStateService: AdminStateService
  ) {}
}
