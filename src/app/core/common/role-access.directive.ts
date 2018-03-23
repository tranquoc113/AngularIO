import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {SecurityService} from './security.service';

@Directive({
  selector: '[roleAccess]'
})
export class RoleAccessDirective implements OnInit {

  @Input('roleAccess') roleAccess: string;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.applyPermission();
  }

  private applyPermission(): void {
    if(this.securityService.hasRole(this.roleAccess)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
