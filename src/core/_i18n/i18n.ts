import { ITranslationService, I18NEXT_SERVICE, I18NextModule, defaultInterpolationFormat, I18NextLoadResult } from 'angular-i18next';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';
import * as i18nextXHRBackend from 'i18next-xhr-backend';


const i18nextOptions = {
  whitelist: ['en', 'es'],
  fallbackLng: 'es',
  debug: false,
  returnEmptyString: false,
  keySeparator: false,

  ns: [
    'translation',


    // 'feature.rich_form'
  ],
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  //backend plugin options
  backend: {
    loadPath: function (langs, ns) {
      return 'assets/locales/{{lng}}.{{ns}}.json';
    }
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    cookieDomain: window.location.hostname
  }
};





export function appInit(i18next: ITranslationService) {

 

  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(i18nextXHRBackend)
      .use(i18nextLanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }];