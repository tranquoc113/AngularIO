import {
  Component, OnDestroy, ViewEncapsulation, Inject,
  OnInit, ViewChild, AfterViewInit, ElementRef
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {SMALL_WIDTH_BREAKPOINT, FULLSCREEN_MODULES} from '../model/config';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {NotificationService} from '../common/notification.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {ScrollService} from "../common/scroll.service";
import {CoreService} from '../core.service';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav;
  @ViewChild('appContain') appContain: ElementRef;
  @ViewChild(NotificationComponent) notification: NotificationComponent;


  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private _subscription;

  url: string;
  path: string;
  isOpen: boolean = true;
  isOpenNotify: boolean;
  isOpenChat: boolean = false;
  isFirstLoad: boolean = false;
  options = {
    collapsed: false,
    compact: false
  };
  isMobile: boolean= false;

  constructor(private router: Router,
              private location: Location,
              private notificationService: NotificationService,
              private scrollService: ScrollService,
              public coreService: CoreService,
              @Inject(ObservableMedia) media) {

    this.path = location.path();
    if (this.path.startsWith('/')) {
      this.path = this.path.slice(1);
    }

    this._subscription = media.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
      this.isOpen = !this.isMobile;
    });
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.url = event.url;
      this.runOnRouteChange();
    });

  }

  ngAfterViewInit(): void  {
    //this.runOnRouteChange();
    this.appScroll();
  }

  ngOnDestroy(): void  {
    this._router.unsubscribe();
    this._subscription.unsubscribe();
  }

  runOnRouteChange(): void {
    /*
    if (this.isOver()) {
      this.sidenav.close();
    }
    */
  }

  isFullScreen(url: string): boolean {
    /*
    for (let entry of FULLSCREEN_MODULES) {
      if (url.indexOf(entry as string) > -1) {
        return true
      }
    }
    */
    return false;
  }

  isMobileScreen() : boolean{
    return this.isMobile;
  }

  updateOptions (options: any){
    this.options = options;
    //console.log('open', this.isOpen);
    setTimeout(() => {
      if(this.isMobile) {
        if(this.isOpen) {
          this.sidenav.close();
        } else {
          if (this.options.compact || (!this.options.compact && !this.isOpen)) {
            this.sidenav.open();
            this.sidenav.mode = 'over';
          } else {
            this.sidenav.close();
          }
        }
      } else {
        if(!this.isOpen) {
          this.sidenav.open();
        }
        this.sidenav.mode = 'side';
      }
    }, 100);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isFullScreen(this.url) && this.isOver() ) {
      if (this.isOpen) {
        this.sidenav.open();
      }
    }
  }

  toogleNotify() {
    this.isOpenNotify = !this.isOpenNotify || this.isOpenChat;
    this.isOpenChat = false;

    if(this.isOpenNotify && !this.isFirstLoad) {
      this.isFirstLoad= true;
    }
  }

  toogleChat(){
    this.isOpenChat = !this.isOpenChat;
    this.isOpenNotify = this.isOpenChat;
  }

  isSafari() {
    return /safari/.test(navigator.userAgent.toLowerCase());
  }

  isOver(): boolean {
    if (this.isFullScreen(this.url)) {
     return true;
    } else {
      return this.mediaMatcher.matches || !this.isOpen;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && !this.isOpen) {
      this.sidenav.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && !this.isOpen) {
      this.sidenav.mode = 'side';
    }
  }

  private appScroll() {
    this.scrollService.setScroller(this.appContain.nativeElement.parentNode);
  }
}
