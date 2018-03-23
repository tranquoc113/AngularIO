import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';
import {NotifyParams} from '../model/notify-params';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private http: HttpClientService, private snackBar: MatSnackBar) { }

  private url = {
    list: iNet.getUrl('social/activity/notify')
  };

  count() {
    return this.http.getJSON(this.url.list);
  }

  getMessage(params: NotifyParams){
    return this.http.getJSON(this.url.list, params);
  }

  showMessage(msg: string, type?:string, duration?: number){
    const config = new MatSnackBarConfig();
    config.duration = duration || 3000;
    config.horizontalPosition = 'right';
    if(!!type){
      config.extraClasses= [`${type.toLowerCase()}SnackBar`];
    }

    this.snackBar.open(msg, '' , config);

  }
}
