import { Component, OnInit } from '@angular/core';
import { Geometri } from '../core/classes/Geometri.model'
import { ApiService } from '../core/services/api.service';

/* Importerar OpenLayers */
import { View, Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import Projection from 'ol/proj/Projection';
import Overlay from 'ol/Overlay';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import { register }  from 'ol/proj/proj4';
import { get as GetProjection } from 'ol/proj'
import { Extent} from 'ol/extent';
import { Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';

import { Layer } from 'ol/layer';

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
  data: Geometri[] = [];

  constructor(public api: ApiService) {}

  /**
   * Vid initiering av sidan
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
  
    // Hämta json-data över geometrier

    /* 
    var geojson_format = new GeoJSON();
    var vector_layer = new Vector();
    this.map.addLayer(vector_layer);

    // vector_layer.addFeatures(geojson_format.readFeatures(this.data));
    */

    const layer = new VectorLayer ({
      visible: true,
      source: new Vector({
         url: '../assets/data/test.geojson',
         format: new GeoJSON()
      })
    });
    this.map.addLayer(layer);

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