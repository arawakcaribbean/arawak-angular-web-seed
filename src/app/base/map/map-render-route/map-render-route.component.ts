import { Component, OnInit, Input } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { RenderRouteMessage } from 'src/core/_events/message';
declare let L;
@Component({
  selector: 'map-render-route',
  templateUrl: './map-render-route.component.html',
  styleUrls: ['./map-render-route.component.css']
})
export class MapRenderRouteComponent implements OnInit {

  map: any
  @Input() lat: number;
  @Input() lng: number;


  waypoints: Array<any>
  routingControl: any
  constructor(public pubsub: PublisherSubscribeService) { }

  ngOnInit() {
    this.buildMap()


    this.pubsub.subscribe(RenderRouteMessage).subscribe((arrayPoint: RenderRouteMessage) => {
      this.waypoints = arrayPoint.waypoints
      this.buildRoute()

    })
  }

  buildMap() {
    this.map = L.map('rmap').setView([this.lat, this.lng], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  buildRoute() {
    let point = []
    this.waypoints.forEach(element => {
      point.push(L.latLng(element.lat, element.lng))
    });
    console.log("----")
    console.log(this.waypoints)

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    this.renderRoute(point);
  }

  renderRoute(point) {
    this.routingControl = L.Routing.control({
      waypoints: point

    }).addTo(this.map);

    /*
   setTimeout(()=>{
    let list = this.routingControl.options.waypoints
    console.log(list[list.length-1])
    let marker = L.marker([list[list.length-1].lat, list[list.length-1].point.lng])
    this.centerLeafletMapOnMarker(this.map,marker)
   },1000)
   */

  }

  centerLeafletMapOnMarker(map, marker) {
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }


}