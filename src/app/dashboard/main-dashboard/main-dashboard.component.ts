import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { DashboardPresentationService } from './dashboard-presentation.service';
import { DashboardPdfService } from './dashboard-pdf.service';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent {
  constructor(
    public navbarService: NavbarService,
    public dashboardPresentationService: DashboardPresentationService,
    public applicationStateService: ApplicationStateService,
    private dashboardPdfService: DashboardPdfService
  ) {}

  public printCharts() {
    const chartsAllRows: HTMLCollectionOf<Element> =
      document.getElementsByClassName('to-be-printed');
    this.dashboardPdfService.saveCharts(chartsAllRows);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.dashboardPresentationService.goPrevious();
    }

    if (event.key === 'ArrowRight') {
      this.dashboardPresentationService.goNext();
    }

    if (event.key === 'Escape') {
      this.dashboardPresentationService.exitPresent();
    }
  }
}
