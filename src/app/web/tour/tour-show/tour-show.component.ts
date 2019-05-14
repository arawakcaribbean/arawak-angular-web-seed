import { Component, OnInit, ElementRef } from '@angular/core';
import { BaseComponent } from 'src/core/_component/base-component';
import { TourService } from 'src/core/_services/placetour/tour-service';
import { ToastrService } from 'ngx-toastr';
import { MapsService } from 'src/core/_maps/maps-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Globals } from 'src/core/_helpers/globals';
import { I18NextService } from 'angular-i18next';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import { Tour } from 'src/core/_models/tour/tour';
import { TourLine } from '../tour-line/tour-line.component';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { RenderRouteMessage } from 'src/core/_events/message';
import { Resource } from 'src/core/_models/entity/resource';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-tour-show',
  templateUrl: './tour-show.component.html',
  styleUrls: ['./tour-show.component.css']
})
export class TourShowComponent extends BaseComponent implements OnInit{
  id:string
  isLoading:boolean
  model:any

  tourList: Array<TourLine> = []
  startDate: any
  endDate: any
  countryId: string

  modelPlace: any

  constructor(public service: TourService,
    public toastr: ToastrService,
    public _serviceMap: MapsService,
    public route: ActivatedRoute,
    private pubsub: PublisherSubscribeService,
    public _config: Globals,
    public ref: ElementRef,
    public i18n: I18NextService,
    private modalService: NgbModal
    ,public _authService: AuthenticationService
    ) {
    super(_authService,toastr, i18n, _config); }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has("id")) {
        this.id = params.get("id")
        this.load()
      }
    })
  }

  load(){
    this.isLoading=true
    this.service.get(this.id).subscribe((response)=>{
      this.isLoading=false
      this.model=response      
      this.model.tourPathDTOs.forEach(element => {
        let listTypes = [];
        let listImages = [];
        if(element.idResource){          
          element.idResource.type.forEach(element => {
          let item = {
            text: element,
            image: "assets/icon/labels/Icons/" + element + ".png"
          }
          listTypes.push(item)
        });
       
        element.idResource.images.forEach(element => {
          listImages.push(this.staticUrl + element)
        });
        }


        this.tourList.push({
          id: element.id,
          placeName: (element.idResource)?element.idResource.name:"",
          date: moment(element.startDate).format("D/M/Y"),
          imagePreview: "",
          description: (element.idResource)?element.idResource.description:"",
          lat: 0,
          lng: 0,
          images: listImages,
          listTypes: listTypes,
          postData: element,
          resource: element.idResource
        })
      });

      console.log(this.tourList)

    },()=>{
      this.isLoading=false
    })
  }

  points: Array<any> = []

  delete(id: string) {
    let index = this.tourList.findIndex(data => data.id == id);
    let item = this.tourList.find(data => data.id == id);
    this.tourList.splice(index, 1)
    let p = this.points.findIndex(data => data.lat == item.lat);
    this.points.splice(p, 1)
    this.pubsub.publish(RenderRouteMessage, {
      waypoints: this.points
    })
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
