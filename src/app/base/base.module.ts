import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionAtraccionComponent } from './section-atraccion/section-atraccion.component';
import { SectionServicesComponent } from './section-services/section-services.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from 'src/core/_i18n/i18n';
import { LaddaModule } from 'angular2-ladda';
import { MapRenderPointComponent } from './map/map-render-point/map-render-point.component';
import { MapRenderRouteComponent } from './map/map-render-route/map-render-route.component';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
 @NgModule({
  declarations: [ HeaderComponent, NavbarComponent, SectionAtraccionComponent, SectionServicesComponent, FooterComponent, LayoutComponent,   MapRenderPointComponent, MapRenderRouteComponent,AutofocusDirective, NotFoundComponent],
  exports:[HeaderComponent, NavbarComponent, SectionAtraccionComponent, SectionServicesComponent, FooterComponent,LayoutComponent, MapRenderPointComponent, MapRenderRouteComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ShareButtonsModule,
    FormsModule, 
    I18NextModule.forRoot(),
    LaddaModule.forRoot({
      style: "expand-right",
      spinnerSize: 40,
      spinnerColor: "#4caf50",
      spinnerLines: 12
   }),
  ],
  providers: [I18N_PROVIDERS],
})
export class BaseModule { }
