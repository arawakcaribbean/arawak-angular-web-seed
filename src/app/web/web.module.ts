import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormTourComponent } from './tour/form-tour/form-tour.component';
import { TourLineComponent } from './tour/tour-line/tour-line.component';
import { TourMapPreviewComponent } from './tour/tour-map-preview/tour-map-preview.component';
import { FormWizardModule } from 'angular2-wizard';
import { I18NextModule } from 'angular-i18next';
import { LaddaModule } from 'angular2-ladda';
import { NgbDatepicker, NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../base/base.module';
import { FormTourModalComponent } from './tour/form-tour-modal/form-tour-modal.component';
import { BaseService } from 'src/core/_services/base.service';
import { I18N_PROVIDERS } from 'src/core/_i18n/i18n';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { PlaceAtractionShowComponent } from './place/place-atraction-show/place-atraction-show.component';
import { PlaceAccommodationShowComponent } from './place/place-accommodation-show/place-accommodation-show.component';
import { NgxLoadingModule } from 'ngx-loading';
import { SearchMapsComponent } from './place/search-maps/search-maps.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { TourShowComponent } from './tour/tour-show/tour-show.component';
import { ShareModule } from 'src/core/_component/share/share.module';
import { TourListComponent } from './tour/tour-list/tour-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { PlaceTransportationOperatorsShowComponent } from './place/place-transportation-operators-show/place-transportation-operators-show.component';
import { PlaceEventShowComponent } from './place/place-event-show/place-event-show.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { NgbdSortableHeader } from 'src/core/_directive/sortable.directive';
import { PlaceShowDetailsComponent } from './place/place-show-details/place-show-details.component';
import { FormClaimComponent } from './place/form-claim/form-claim.component';

@NgModule({
  declarations: [NgbdSortableHeader,FormTourComponent, SearchMapsComponent, TourLineComponent, TourMapPreviewComponent, FormTourModalComponent, PlaceEventShowComponent, PlaceAtractionShowComponent, PlaceTransportationOperatorsShowComponent, PlaceAccommodationShowComponent, TourShowComponent, TourListComponent, PlaceShowDetailsComponent, FormClaimComponent],
  exports: [PlaceEventShowComponent, PlaceAtractionShowComponent, PlaceTransportationOperatorsShowComponent, PlaceAccommodationShowComponent],
  imports: [
    CommonModule,
   
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    ShareModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormWizardModule,
    SlideshowModule,
    I18NextModule.forRoot(),
    NgxLoadingModule,
    LottieAnimationViewModule,
    BaseModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgBootstrapFormValidationModule.forRoot(),
    LaddaModule.forRoot({
      style: "expand-right",
      spinnerSize: 40,
      spinnerColor: "#0179c1",
      spinnerLines: 12
    }),
  ],
  providers: [I18N_PROVIDERS, BaseService, PlaceService, DecimalPipe],
})
export class WebModule { }
