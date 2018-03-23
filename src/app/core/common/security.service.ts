import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {

  roles: Array<string> = [];
  constructor() {
    this.roles= this.parserRoleFrom(iNet.permission || {});
    //console.log('[roles]', this.roles);
  }

  private parserRoleFrom(obj: Object): Array<string>{
    let roles: Array<string> = [];
    for(let key in obj) {
      if(obj[key]==="true" || obj[key]===true){
        roles.push(key);
      }
    }
    return roles;
  }

  hasRole(v: string):boolean {
    let roles = v.split(',');
    if(roles.length>1) {
      this.roles = this.roles.filter(v => this.roles.indexOf(v)>-1);
      return (this.roles.length>0);
    }
    return (this.roles.indexOf(v)>-1);
  }

  /**
   * Check session timeout when system is idle
   */
  ping() {
    let iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.setAttribute("src", iNet.getPUrl('common/page/ping'));
    iframe.onload= function() {
      const __loginUrl = 'cas/login';
      try {
        let __path = iframe.contentWindow.location.pathname || '';
        let __isLogin = (__loginUrl.match(__path) || []).length > 0;
        if (__isLogin) {
          window.location.reload();
        }
      } catch(ex) {
        window.location.reload();
      }
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  }

}
