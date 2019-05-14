import { Injectable, ElementRef } from '@angular/core';
import { BaseService } from '../_services/base.service';
import { TouchSequence } from 'selenium-webdriver';
declare let L;

@Injectable({
    providedIn: 'root'
})

export class MapsService {
    listMarker: Array<Point> = []
    idElemnt: string
    map: any
    marker: any

    constructor( ) { }

    builMap(idElemnt, initLat, initLng, initZoon,ref) {
        this.idElemnt = idElemnt
        this.map = L.map(idElemnt).setView([initLat, initLng], initZoon);        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }
    getMap(){
        return this.map;
    }

     
    removeAllMarker() {
        this.listMarker.forEach(element => {
            if (element) {
                this.map.removeLayer(element)
            }
        });
    }
    addMarker(point: Point,center:boolean,type:string) {
        let icon = L.icon({
            iconUrl:"assets/icon/entities/"+type+".png"
        });

        let marker = L.marker([point.latitude, point.longitude],{icon:icon}).addTo(this.map);
        if(center)
            this.centerLeafletMapOnMarker(this.map, marker);
        let exist = this.listMarker.filter(data => data == point).length > 0
        if (!exist) {
            this.listMarker.push(marker)
        }
        return marker;
    }

    addPopupToMarker(marker,template){
        marker.bindPopup(template)
    }

    centerLeafletMapOnMarker(map, marker) {
        var latLngs = [marker.getLatLng()];
        var markerBounds = L.latLngBounds(latLngs);
        map.fitBounds(markerBounds);
    }


    getTemplate(data:any,i18n:any) {
        let label=i18n.t('DETAILS')
        let text="<strong>"+i18n.t('Name')+"</strong>: "+data.name+"</br>"
      //  text+="<strong>"+i18n.t('Country')+"</strong>: "+data.country+"</br>"
      //  text+="<strong>"+i18n.t('City')+"</strong>: "+data.city+"</br>"
        return text+"</br><button style='float:right' class='btn btn-sm btn-primary'  id='buttonsubmit"+data.id+"' ><i class='fa fa-list'></i></button></br></br>"
      }
}

export class Point{
    latitude:number
    longitude:number
}