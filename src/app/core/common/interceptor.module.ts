import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/do';
import {SecurityService} from './security.service';
import {environment} from '../../../environments/environment';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private securityService: SecurityService) {
    console.log('[environment][production]', environment.production)
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('[HttpInterceptor][Req]', req);
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse ) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if(environment.production) {
          this.securityService.ping();
        }
        //let statusCode = err.status ;
       //console.log('[HttpInterceptor][ErrorResponse]=', err);
       //console.log('[HttpInterceptor][statusCode]=', statusCode);
       /*
       switch (statusCode) {
         case 0:
         case 401:
            this.securityService.ping();
           break;
         default:
           return;
       }
       */
      }
    });
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
