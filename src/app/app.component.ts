import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarService } from './services/navbar.service';
import { AdminStateService } from './services/admin-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    public navbarService: NavbarService,
    public adminStateService: AdminStateService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
