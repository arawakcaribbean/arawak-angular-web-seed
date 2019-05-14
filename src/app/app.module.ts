import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { BaseModule } from './base/base.module';
import { WebModule } from './web/web.module';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from 'src/core/_i18n/i18n';
import { BaseService } from 'src/core/_services/base.service';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/core/_helpers/jwt.interceptor';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from 'src/app-init';
 



registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar');
@NgModule({
  declarations: [
    AppComponent,
     
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    BaseModule,
    WebModule,
     ToastrModule.forRoot(),
    I18NextModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ShareButtonsModule,
    KeycloakAngularModule


  ],
  providers: [
    I18N_PROVIDERS,
    BaseService,
    PlaceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent] 
  
})
export class AppModule { }
