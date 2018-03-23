import {NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

/* Shared Modules */
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
/* Components Modules */
import {LayoutComponent} from './layout/layout.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {PsDirective} from './common/perfect-scrollable.directive';
import {HttpClientService} from './common/http-client.service';
import {NotificationService} from './common/notification.service';
import {InfiniteScrollerDirective} from './common/infinite-scroller.directive';
import {ScrollService} from "./common/scroll.service";
import {SecurityService} from './common/security.service';
import {RoleAccessDirective} from './common/role-access.directive';
import {AuthenticateGuard} from './common/authenticate.guard';
import {InterceptorModule} from './common/interceptor.module';
import {environment} from '../../environments/environment';
import {BsModalService, ModalModule} from "ngx-bootstrap";
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from './menu/menu-accordion';
import {MenuComponent} from './menu/menu.component';
import {NotificationComponent} from './notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    InterceptorModule,
    ModalModule.forRoot()
  ],
  declarations: [
    LayoutComponent, NavbarComponent, SidenavComponent,
    PsDirective, InfiniteScrollerDirective,
    RoleAccessDirective,
    AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective,
    MenuComponent, NotificationComponent
  ],
  exports: [LayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClientService,
    NotificationService,
    ScrollService,
    SecurityService,
    AuthenticateGuard,
    BsModalService
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    private securityService: SecurityService
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
    if (environment.production) {
      setInterval(this.securityService.ping.bind(this), 2*60000);
    }
  }
}
