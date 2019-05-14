import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { BaseComponent } from 'src/core/_component/base-component';
import { Resource } from 'src/core/_models/entity/resource';
import { ToastrService } from 'ngx-toastr';
import { MapsService } from 'src/core/_maps/maps-service';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/core/_helpers/globals';
import { I18NextService } from 'angular-i18next';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';

@Component({
  selector: 'place-show-details',
  templateUrl: './place-show-details.component.html',
  styleUrls: ['./place-show-details.component.css']
})
export class PlaceShowDetailsComponent extends BaseComponent implements OnInit {
  @Input() selectPlace: Resource
  map: any
  loading: boolean = false;
  filter: string = ""
  country: string = null

  listResources: Array<Resource> = [];
  selectedType: string = ''
  selectedID: string

  constructor(public toastr: ToastrService,
    public _serviceMap: MapsService,
    public _service: PlaceService,
    public route: ActivatedRoute,
    public _config: Globals,
    public ref: ElementRef, public i18n: I18NextService,
    public _authService: AuthenticationService
  ) {
    super(_authService, toastr, i18n, _config);
  }

  ngOnInit() {   
    this.selectedID = this.selectPlace.id
    this.selectedType = this.selectPlace.__type
    this._serviceMap.builMap('mapPS', 21.064, -76.377, 6, this.ref)
    this.renderPoint();
  }


  renderPoint() {
    let m = this._serviceMap.addMarker({ latitude: this.selectPlace.location.lat, longitude: this.selectPlace.location.lon }, false, this.selectPlace.__type)
    this._serviceMap.centerLeafletMapOnMarker(this.map, m);
  }
  
}