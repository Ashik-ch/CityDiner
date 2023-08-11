import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { LatLngTuple, Map, map } from 'leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]

  @ViewChild('map', { static: true })
  mapRef!: ElementRef


  @Input() lat = 0;
  @Input() long = 0;
  map!: Map;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map(this.mapRef.nativeElement).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([this.lat, this.long]).addTo(this.map)
      .bindPopup(`Latitude ${this.lat} Longitude ${this.long}`)
      .openPopup();
  }

}
