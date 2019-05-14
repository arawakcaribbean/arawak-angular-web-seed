import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
declare let L;
import '../../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/core/_component/base-component.js';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/core/_helpers/globals.js';
import { I18NextService } from 'angular-i18next';
import { MapsService } from 'src/core/_maps/maps-service.js';
import { PlaceService } from 'src/core/_services/placetour/place-service.js';
import { Resource } from 'src/core/_models/entity/resource.js';
import { AuthenticationService } from 'src/core/_services/user/authentication.service.js';

@Component({
  selector: 'app-search-maps',
  templateUrl: './search-maps.component.html',
  styleUrls: ['./search-maps.component.css'],

})

export class SearchMapsComponent extends BaseComponent implements OnInit {
  map: any
  loading: boolean = false;
  filter: string = ""
  country: string = null

  listResources: Array<Resource> = [];
  selectedType: string=''
  selectedID: string

  constructor(public toastr: ToastrService,
    public _serviceMap: MapsService,
    public _service: PlaceService,
    public route: ActivatedRoute,
    public _config: Globals,
    public ref: ElementRef,    public i18n: I18NextService,

    public _authService: AuthenticationService
    ) {
    super(_authService,toastr, i18n, _config);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      let name = params.get('name');
      if (params.get('filter'))
        this.filter = params.get('filter');
      if (params.get('eventClick')){
         let eventClick = params.get('eventClick'); 
         if(eventClick=="true" && this.filter){
           this.loadPlace()
         }
      }
      
      if (params.get('country'))
        this.country = params.get('country');
      let data = null
      if (data) {
        this._serviceMap.builMap('map', data.lat, data.lon, data.zoom, this.ref)
      } else {
        this._serviceMap.builMap('map', 21.064, -76.377, 6, this.ref)
      }
    });
  }


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
    this._service.getResource(this.filter, this.country).subscribe((listResources) => {
      this.listResources = listResources;
      this.renderPoint()
      this.loading = false;
    }, () => {

      this.loading = false;
     })

  }



}

