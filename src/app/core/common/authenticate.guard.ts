import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SecurityService} from './security.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private securityService: SecurityService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let roles = next.data["roles"] as Array<string>;
    //console.log('[canActivate][with roles]', roles);
    return this.securityService.hasRole(roles.join(','));
  }
}
