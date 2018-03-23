import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class HttpClientService extends HttpClient {
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  /**
   * Convert Object to HttpParams
   * @param {Object} obj
   * @returns {HttpParams}
   */
  convertToHttpParams(obj: Object): HttpParams {
    if(!obj){
      return null;
    }
    return Object.getOwnPropertyNames(obj)
      .reduce((p, key) => p.set(key, obj[key]==undefined ? '' : obj[key]), new HttpParams());
  }

  getJSON(url: string, body?: any | null): Observable<Object> {
    return this.get(url, {params: this.convertToHttpParams(body), headers: this.headers });
  }

  postJSON(url: string, body?: any | null): Observable<Object> {
    return this.post(url, this.convertToHttpParams(body) , {headers: this.headers});
  }


  putJSON(url: string, body?: any | null): Observable<Object> {
    return this.put(url, this.convertToHttpParams(body) , {headers: this.headers});
  }

  deleteJSON(url: string, body?: any | null): Observable<Object> {
    return this.delete(url, {params: this.convertToHttpParams(body), headers: this.headers });
  }

  convertToFormData(obj: Object): FormData {
    //console.log('[convertToFormData]', obj);
    let formData = new FormData();
    if(!obj){
      return formData;
    }
    Object.keys(obj).forEach(k => {
      //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
      formData.append(k, obj[k]==undefined ? '' : obj[k]);
    });
    //console.log('[formData]', formData);
    return formData;
  }

  /**
   * Download files with Blob
   * @param {string} url - The given URL
   * @param {Object} obj - The given params
   */
  /*
  downloadFile(url: string, obj: Object) {
    console.log('[downloadFile]', url, obj);
    const __headers = new HttpHeaders();
    let p = this.post(url, this.convertToFormData(obj), {responseType: "blob", headers: __headers});
      p.subscribe(response => {
        //const blob = new Blob([response]);
        //FileSaver.saveAs(blob);
      });
  }
  */

  /**
   * Download files with FormData
   * @param {string} url - The given URL
   * @param {Object} obj - The params
   */
  downloadFile(url: string, obj?: Object) {
    if(!obj){
      return;
    }
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.enctype = 'multipart/form-data';

    Object.keys(obj).forEach(k => {
      //console.log('[key]', k , '=', obj[k]==undefined ? '' : obj[k]);
      let input = document.createElement("input");
      input.name = k;
      input.value = obj[k]==undefined ? '' : obj[k];
      input.type = 'hidden';
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
}
