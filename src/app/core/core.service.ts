import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {HttpClientService} from "./common/http-client.service";

@Injectable()
export class CoreService {

  constructor(private http: HttpClientService) { }

  logout() {
    const url: string = iNet.getUrl('system/logout');
    this.http.post(url, {'username': iNet.username}).subscribe(
      (data: LogoutData) => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', data.uuid);
        iframe.addEventListener('load', function() {
          location.reload();
        });
        document.body.appendChild(iframe);
    },  (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );
  }

  saveSuggestion(params: SuggestionParamData, callback?: Function) {
    if(!params.keyword){
      return;
    }
    callback = callback || function() {};
    return this.http.postJSON(iNet.getUrl('system/suggestion/update'), params).subscribe(
      (data) => {
        callback(data);
      },
      (err) => {
        callback(null, err);
      }
    );
  }

  loadSuggestion(params: SuggestionParamData, callback: Function) {
    callback = callback || function () {};
    this.http.postJSON(iNet.getUrl('system/suggestion/hint'), params).subscribe(
      (data: SuggestionResponse) => {
        callback(data && data.items || []);
      },
      err => {
        callback([], err);
      }
    );
  }

  getAvatar(usercode: string, thumbnail?: number) {
    thumbnail = thumbnail || 50;
    return iNet.getUrl('system/userprofile/photo') +
      `?usercode=${usercode}&thumbnail=${thumbnail}`;
  }

  isExternalUser(){
    return (iNet.externalUser=="true");
  }

  isCommunity(){
    return (this.isExternalUser() || iNet.firmPrefix=="smartcloud" || iNet.firmPrefix=="community");
  }

  getOrg() {
    return this.http.get(iNet.getUrl('plugin/organization/list')).map((res:CustomResponse) => res.elements);
  }

  getSystemApplication(){
    return this.http.get(iNet.getPUrl('system/application/list')).map((res:CustomResponse) => res.elements);
  }

  /**
   * Search user account in own unit
   * @param params
   * - keyword: string
   * - pageSize: number
   * - pageNumber: number
   * @param callback
   */
  searchFirmAccount(params, callback: Function) {
    this.http.postJSON(iNet.getPUrl('plugin/firmaccount/list'), params).subscribe(
      (data) => {
        callback(data);
      },
      (err) => {
        callback(null, err);
      }
    )
  }

}

interface LogoutData {
  uuid: string;
}

interface SuggestionParamData {
  content: string;
  keyword: string;
}

interface SuggestionResponse {
  items: SuggestionItem[];
  total: number;
}

interface SuggestionItem {
  content: string;
  keyword: string;
  ownercode: string;
  usage: number;
  uuid: string;
}

interface CustomResponse extends Response{
  elements: any[];
}