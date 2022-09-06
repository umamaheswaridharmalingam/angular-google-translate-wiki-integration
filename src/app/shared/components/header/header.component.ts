import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare function initlGoogleTranslate(): any;
declare function showOrginalLanguage(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = '';
  // @Input() user: User;

  @Output() onLogout = new EventEmitter();
  @Output() oncreatePlaylist = new EventEmitter();
  @Output() onToggleSidenav = new EventEmitter();
  @Output() onToggleTheme = new EventEmitter();
  showResetBtn: boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      initlGoogleTranslate();
    }, 1000);
  }

  logout() {
    this.onLogout.emit();
  }

  createPlaylist() {
    this.oncreatePlaylist.emit();
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }

  reset() {
    showOrginalLanguage();
  }

  toggleTheme() {

    this.onToggleTheme.emit();
  }

}
