import { Component, OnInit } from '@angular/core';
import { Geometri } from '../core/classes/Geometri.model'
import { ApiService } from '../core/services/api.service';

/* Importerar OpenLayers */
import * as ol from 'ol';
import { View, Feature, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // Kordinater över visby
  latitude: number = 18.3278145;
  longitude: number = 57.6271917;

  map: any;
  mapWMS: any;

  constructor(public api: ApiService) {}

  /**
   * Vid initiering av sidan skapas kartan
   */
  ngOnInit(): void {
    // Skapa kartan med position över visby
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM() // openstreetmap
        })
      ],
      view: new View({
        center: fromLonLat([this.latitude, this.longitude]),
        zoom: 12
      })
    });

    // Hämta data från GeoServern
    this.mapWMS = new ImageLayer({
      source: new ImageWMS({
        params: {'LAYERS': 'Workspace:geometri'},
        serverType: 'geoserver',
        url: 'http://109.225.108.59:8080/geoserver/Workspace/wms'
      })
    })
    this.mapWMS.setOpacity(0.4);
    this.map.addLayer(this.mapWMS); // lägg på layer på kartan

    /*
    // När användaren trycker på en geometri skrivs det ut i konsolen.
    this.map.on('click', function(e){
      map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
        console.log(feature);
      })
    })
    */
  }
}