import { TranslateLoader } from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {viLocale} from '../../i18n/vi';
import {enLocale} from '../../i18n/en';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale(viLocale.abbr, viLocale);
defineLocale(enLocale.abbr, enLocale);

export class CloudTransLoader implements TranslateLoader {
  constructor() {
  }
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case viLocale.abbr:
        return Observable.of(viLocale);
      case enLocale.abbr:
      default:
        return Observable.of(enLocale);
    }
  }
}
