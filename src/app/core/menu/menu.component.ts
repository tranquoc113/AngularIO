import { Component, OnInit } from '@angular/core';
import {CoreService} from '../core.service';
import {NotificationService} from '../common/notification.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isCommunity: boolean = true;
  url: string;
  constructor(private coreService: CoreService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.isCommunity = this.coreService.isCommunity();
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });
  }

  openApp(url: string): void {
    window.location.href = url;
  }

  openAppWithSSO(url: string): void {
    this.openApp(iNet.getSSOUrl(url));
  }
}
