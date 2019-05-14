import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { states } from '../form-tour/form-tour.component';
import { RenderPointMessage } from 'src/core/_events/message';
import { NgbTypeahead, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/core/_models/country';
import { BaseComponent } from 'src/core/_component/base-component';
import { ToastrService } from 'ngx-toastr';
import { MapsService } from 'src/core/_maps/maps-service';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/core/_helpers/globals';
import { I18NextService } from 'angular-i18next';
import { Resource } from 'src/core/_models/entity/resource';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import * as moment from 'moment';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import { BookableService } from 'src/core/_services/placetour/bookable';
declare let L;
@Component({
  selector: 'form-tour-modal',
  templateUrl: './form-tour-modal.component.html',
  styleUrls: ['./form-tour-modal.component.css']
})
export class FormTourModalComponent extends BaseComponent implements OnInit {
  @Input() countryId: any
  @Input() startDate: any
  @Input() endDate: any

  @Output() onValidate = new EventEmitter()
  @Output() onChangeData = new EventEmitter()

  map: any
  loading: boolean = false;
  filter: string = ""


  listResources: Array<Resource> = [];
  selectedType: string = ''
  selectedID: string


  form: FormGroup
  constructor(public toastr: ToastrService,
    public _serviceMap: MapsService,
    public route: ActivatedRoute,
    public _config: Globals,
    public ref: ElementRef,
    public _service: PlaceService,
    public configDate: NgbDatepickerConfig,
    public i18n: I18NextService,
    public _authService: AuthenticationService,
    public _serviceBookable: BookableService

  ) {
    super(_authService, toastr, i18n, _config);

  }

  loadingReserve: boolean
  idBooking: string = ""
  goReverve() {
    this.loadingReserve = true
    let startDate = this.form.controls.startDate.value.year + "-" + this.form.controls.startDate.value.month + "-" + this.form.controls.startDate.value.day;
    let endDate = this.form.controls.endDate.value.year + "-" + this.form.controls.endDate.value.month + "-" + this.form.controls.endDate.value.day;
   
    this._serviceBookable.createBooking(this.selectedResource.bookable, moment(startDate).toISOString(), moment(endDate).toISOString(), this.selectedResource.id).subscribe((data) => {
      this.showSnackBar('success', this.trans('Your reservation has been successfully registered'))
      this.idBooking = data.id
      this.loadingReserve = false

    }, () => {
      this.loadingReserve = false
      this.showSnackBar('error', this.trans('It was not possible to register your reservation, on the selected dates this place is booked, try another date'))
    })
  }


  ngOnInit() {
    this.configDate.minDate = { year: this.startDate.year, month: this.startDate.month, day: this.startDate.day };
    this.configDate.maxDate = { year: this.endDate.year, month: this.endDate.month, day: this.endDate.day };
    this.form = new FormGroup({
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      place: new FormControl('', Validators.required),
    });
    this._serviceMap.builMap('modal-map', 21.064, -76.377, 6, this.ref)

    this.loadPlace()




    this.form.valueChanges.subscribe((data) => {
      let isValid = false;
      if (data.endDate && data.endDate.year && data.startDate && data.startDate.year && data.place && data.place.id) {
        isValid = true
      } else {
        isValid = false;
      }
      this.onValidate.emit(isValid)
      data = Object.assign(data, { idBooking: this.idBooking })
      this.onChangeData.emit(data)
    });

    this.form.controls.startDate.valueChanges.subscribe((data) => {
      this.startDate=this.form.controls.startDate.value
      this.loadPlace();
    })
    this.form.controls.endDate.valueChanges.subscribe((data) => {
      this.startDate=this.form.controls.endDate.value
      this.loadPlace();
    })

  }


  search() {
    this.loadPlace()
  }




  showBntReserve: boolean = false;
  selectedResource: Resource;
  renderPoint() {
    this._serviceMap.removeAllMarker()

    setTimeout(() => {
      this.listResources.forEach(element => {
        let marker = this._serviceMap.addMarker({ latitude: element.location.lat, longitude: element.location.lon }, false, element.__type)
        this._serviceMap.addPopupToMarker(marker, this._serviceMap.getTemplate(element, this.i18n))
        let _this = this;
        this._serviceMap.getMap().on("popupopen", (e) => {
          setTimeout(() => {
            let domElement = this.ref.nativeElement.querySelector('#buttonsubmit' + element.id);
            if (domElement) {
              domElement.addEventListener('click', function () {
                _this.selectedType = "";
                setTimeout(() => {
                  _this.selectedType = element.__type
                  _this.selectedID = element.id
                  _this.form.controls.place.setValue(element);
                  _this.selectedResource = element;
                  _this.showBntReserve = true
                }, 200)
              })
            }

          }, 200)
        })
      });


    }, 100)

  }


  loadPlace() {
    this.loading = true
    let startD = moment(this.startDate.year + "/" + this.startDate.month + "/" + this.startDate.day).toISOString()
    let endD = moment(this.endDate.year + "/" + this.endDate.month + "/" + this.endDate.day).toISOString()
    /*
        this._service.getResourceAvailable(this.countryId,startD,endD,true).subscribe((listResources) => {
          this.listResources = listResources;
          this.renderPoint()
          this.loading = false;
        }, () => { this.loading = false; })
    */

    this._service.getResource("rent", this.countryId).subscribe((listResources) => {
      this.listResources = listResources;
      this.renderPoint()
      this.loading = false;
    }, () => { this.loading = false; })


  }



}
