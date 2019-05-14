import { Component, OnInit, Input } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { RenderPointMessage } from 'src/core/_events/message';
declare let L;

@Component({
  selector: 'map-render-point',
  templateUrl: './map-render-point.component.html',
  styleUrls: ['./map-render-point.component.css']
})
export class MapRenderPointComponent implements OnInit {
  map: any
  lat: number = 21.064
  lng: number = -76.377
  marker:any

  
  constructor(public pubsub: PublisherSubscribeService) { }

  ngOnInit() {
    this.buildMap()
    this.pubsub.subscribe(RenderPointMessage)
      .subscribe((p: RenderPointMessage) => {
       
        if (p) {
          this.lat = p.point.latitude
          this.lng = p.point.longitude
          if(this.marker){
            this.map.removeLayer(this.marker)
          }
          var LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: 'assets/img/actor.png',
                iconSize:     [38, 95],
                shadowSize:   [50, 64],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]
            }
        });

          this.marker = L.marker([p.point.latitude, p.point.longitude]).addTo(this.map);
          this.centerLeafletMapOnMarker(this.map,this.marker)

        }
      })
  }

  centerLeafletMapOnMarker(map, marker) {
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }

  buildMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }
}
