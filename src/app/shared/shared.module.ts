import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
/* Angular Material */
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatNativeDateModule, MatTooltipModule
} from '@angular/material';

import { DateAdapter} from '@angular/material/core';

import { CoreService } from '../core/core.service';
import {BsDropdownConfig, ComponentLoaderFactory, PositioningService} from "ngx-bootstrap";
import {LangChangeEvent, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {CloudTransLoader} from '../core/common/cloud-trans-loader';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: CloudTransLoader}
    })
  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    TranslateModule
  ],
  providers: [
    CoreService,
    ComponentLoaderFactory,
    PositioningService,
    BsDropdownConfig,
    BsLocaleService
  ]
})
export class SharedModule {
  constructor(
    private adapter: DateAdapter<any>,
    public translate: TranslateService,
    public localeService: BsLocaleService
  ) {
    let key = 'language';
    let languages = listLocales();
    translate.addLangs(languages);

    //console.log(localStorage.getItem('language'));
    let lang = localStorage.getItem(key) ||languages[0];
    translate.setDefaultLang(lang);
    translate.use(lang);

    // Set date locale vi for material date picker
    this.adapter.setLocale(lang);

    //Change a locale
    this.localeService.use(lang);

    // Listen for changes
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //console.log('onLangChange', event);
      localStorage.setItem(key, event.lang);
      window.location.reload();
    });
  }
}
