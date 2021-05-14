import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';

/* Importerar OpenLayers */
import * as ol from 'ol';
import { View, Feature, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorImage from 'ol/layer/Image';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import { Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';

import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

//import sync from 'ol-hashed';

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
  layer: any;

  constructor(public api: ApiService) { }

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
    this.layer = new VectorLayer({
      source: new VectorSource({
        // Make sure to configure the URL according to your needs
        url: 'http://109.225.108.59:8080/geoserver/Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Workspace%3Ageometri&outputFormat=application%2Fjson&srsname=EPSG:3857',
        format: new GeoJSON()
      }),
    });
    this.layer.setOpacity(1);
    this.map.addLayer(this.layer); // lägg på layer på kartan

    this.map.on("click", (e: any) => {
      this.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) { // denna funkar inte, finns inga features at pixel?
        console.log(feature);
        console.log("id: " + feature.id_);
      });
    });

    // Don't let the map change coordinate view when refreshing the page
    //sync(this.map);

  }

}