import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Google translate & Wikipedia Integration';
  navMode: MatDrawerMode = 'side';
  playerCollapsed = true;
  darkTheme = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleTheme() {
    this.darkTheme = this.darkTheme ? false : true;
  }

  isMobile() {
    return (window.innerWidth < 768);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    if (this.isMobile()) {
      this.navMode = 'over' as MatDrawerMode;
    }
    else {
      this.navMode = 'side' as MatDrawerMode;
      this.playerCollapsed = false;
    }
  }

}
