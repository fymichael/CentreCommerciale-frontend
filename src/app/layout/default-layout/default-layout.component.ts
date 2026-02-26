import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})

export class DefaultLayoutComponent {

  public navItems: INavData[] = [];

  constructor(
    private titleService: Title,
    private authService: AuthService
  ) {
    this.titleService.setTitle('M1P13mean-Fy-Chalman - Centre Commercial');

    this.filterMenuByRole();
  }
    
  private filterMenuByRole() {
    const role = this.authService.getUserRole();

    if (!role) {
      this.navItems = [];
      return;
    }

    this.navItems = navItems.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(role);
    });
  }
}
