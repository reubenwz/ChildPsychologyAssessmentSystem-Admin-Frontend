import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ApplicationStateToastComponent } from './application-state-toast/application-state-toast.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ApplicationStateToastComponent,
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ApplicationStateToastComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
    ToastModule,
  ],
})
export class SharedComponentsModule {}
