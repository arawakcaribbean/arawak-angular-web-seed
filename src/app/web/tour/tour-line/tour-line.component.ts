import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { states } from '../form-tour/form-tour.component';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { RenderPointMessage, RenderRouteMessage } from 'src/core/_events/message';
import { NgbModal, ModalDismissReasons, NgbTypeahead, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BaseComponent } from 'src/core/_component/base-component';
import { ToastrService } from 'ngx-toastr';
import { MapsService } from 'src/core/_maps/maps-service';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/core/_helpers/globals';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { I18NextService } from 'angular-i18next';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import * as moment from 'moment';
import { Resource } from 'src/core/_models/entity/resource';

@Component({
  selector: 'tour-line',
  templateUrl: './tour-line.component.html',
  styleUrls: ['./tour-line.component.css']
})
export class TourLineComponent extends BaseComponent implements OnInit {
  tourList: Array<TourLine> = []
  @Input() startDate: any
  @Input() endDate: any
  @Input() countryId: string
  @Output() onUpdateTour = new EventEmitter()

  modelPlace: any

  constructor(public toastr: ToastrService,
    public _serviceMap: MapsService,
    public route: ActivatedRoute,
    public _config: Globals,
    public ref: ElementRef,
    public _service: PlaceService,
    public configDate: NgbDatepickerConfig,
    public i18n: I18NextService,
    public _authService: AuthenticationService,
    private pubsub: PublisherSubscribeService, private modalService: NgbModal
  ) {
    super(_authService, toastr, i18n, _config);

  }
  points: Array<any> = []
  ngOnInit() {

  }
  disabledBtnSubmit: boolean = true
  handleValidate(isValid) {
    this.disabledBtnSubmit = !isValid
  }
  handleChangeDate(data) {
    this.modelPlace = data;
  }
  delete(id: string) {
    let index = this.tourList.findIndex(data => data.id == id);
    let item = this.tourList.find(data => data.id == id);
    this.tourList.splice(index, 1)
    let p = this.points.findIndex(data => data.lat == item.lat);
    this.points.splice(p, 1)
    this.pubsub.publish(RenderRouteMessage, {
      waypoints: this.points
    })

    this.onUpdateTour.emit(this.tourList);

  }
  selectPlace: Resource
  show(content, place: Resource) {
    this.selectPlace = place
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });

  }

  closeResult: string;
  openModal: boolean = false;
  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      let place = this.tourList.find(data => data.id == this.modelPlace.place.id)
      if (!place) {
        let listTypes = [];
        this.modelPlace.place.type.forEach(element => {
          let item = {
            text: element,
            image: "assets/icon/labels/Icons/" + element + ".png"
          }
          listTypes.push(item)
        });
        let listImages = [];
        this.modelPlace.place.images.forEach(element => {
          listImages.push(this.staticUrl + element)
        });
        let startDate = this.modelPlace.startDate.year + - + this.modelPlace.startDate.month + - + this.modelPlace.startDate.day;
        let endDate = this.modelPlace.endDate.year + - + this.modelPlace.endDate.month + - + this.modelPlace.endDate.day;
        let postData = {
          endDate: moment(endDate).toISOString(),
          idBooking: this.modelPlace.idBooking,
          idLocation: "",
          idResource: this.modelPlace.place.id,
          startDate: moment(startDate).toISOString(),
          tourPathStatus: "PLANNED"
        }
        this.tourList.push({
          id: this.modelPlace.place.id,
          placeName: this.modelPlace.place.name,
          date: this.modelPlace.startDate.year + "-" + this.modelPlace.startDate.month + "-" + this.modelPlace.startDate.day,
          imagePreview: "",
          description: this.modelPlace.place.description,
          lat: this.modelPlace.place.location.lat,
          lng: this.modelPlace.place.location.lon,
          images: listImages,
          listTypes: listTypes,
          postData: postData,
          resource: this.modelPlace.place

        });
        this.onUpdateTour.emit(this.tourList);
        this.points.push({
          lat:this.modelPlace.place.location.lat,
          lng:this.modelPlace.place.location.lon
        })
        this.pubsub.publish(RenderRouteMessage, {
          waypoints: this.points
        })
        this.modelPlace = null;
      } else {
        this.showSnackBar("info", this.trans('In the Tour this added place already exists'));
      }
    });
  }





}

export interface TourLine {
  id: string
  placeName: string
  date: string
  imagePreview: string
  description: string
  lat: number
  lng: number
  images: Array<string>
  listTypes: Array<any>
  postData: any
  resource: Resource

}
