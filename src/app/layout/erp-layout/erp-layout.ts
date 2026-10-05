import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { SidebarMenu } from '../sidebar-menu/sidebar-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Navbar , SidebarMenu , RouterOutlet ],
  selector: 'app-erp-layout',
  styleUrl: './erp-layout.css',
  templateUrl: './erp-layout.html',
})
export class ErpLayout {

    sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
