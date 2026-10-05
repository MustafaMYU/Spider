import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../models/services/auth-service';
import { BreadcrumbService } from '../../models/services/breadcrumb.spec';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  @Output() sidebarToggle =
    new EventEmitter<void>();

  isOpenMenu = false;

  currentSection$: Observable<string>;

  constructor(
    private _router: Router,
    private authService: AuthService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.currentSection$ =
      this.breadcrumbService.currentSection$;
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleUserMenu(): void {
    this.isOpenMenu =
      !this.isOpenMenu;
  }

  logout(): void {
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
