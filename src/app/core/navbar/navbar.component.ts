import {Component, ViewEncapsulation, Output, EventEmitter, ViewChild} from '@angular/core';
import {CoreService} from '../core.service';
import {NotificationService} from '../common/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  brandName: string = "iNet Solutions Corp";
  homepage: string = 'http://www.inetcloud.vn';
  @Output('toggle') onToggle = new EventEmitter<void>();
  @Output('toggleNotify') onToggleNotify = new EventEmitter<void>();
  @Output('toggleChat') onToggleChat = new EventEmitter<void>();
  langs: Array<string> = [];
  currentLanguage: string;
  messageCount: number = 0;
  url: string;
  moduleName: string = '';

  toggleSidebar() {
    this.onToggle.emit();
  }

  toggleNotify() {
    this.onToggleNotify.emit();
  }

  toggleChat() {
    this.onToggleChat.emit();
  }

  constructor(private coreService: CoreService,
              private notificationService: NotificationService,
              public translate: TranslateService,
              private router: Router) {
    //this.homepage = window.location.protocol + "\/\/" + window.location.host + "\/" + iNet.firmPrefix;
    //this.brandName = ((environment.production ? iNet.orgName || iNet.firmPrefix : iNet.firmPrefix) as string).toUpperCase();

    this.langs = translate.getLangs(); // Languages
    this.currentLanguage = localStorage.getItem('language') || translate.currentLang;

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });
  }

  logout() {
    this.coreService.logout();
  }

  onChangeLanguage(lang: string) {
    this.translate.use(lang).subscribe(
      (data: any) => {
        this.currentLanguage = lang;
      }
    );
  }
}
