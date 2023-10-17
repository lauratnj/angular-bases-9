import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.709227831924494, 40.47694217873362);

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map div not found";
    if ( !this.lngLat ) throw "LngLat can't be null";

    // mapa
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    // marker
    new Marker()
      .setLngLat( this.lngLat )
      .addTo( this.map )


  }

}
