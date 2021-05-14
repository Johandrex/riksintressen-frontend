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
    // url: 'http://109.225.108.59:8080/geoserver/Workspace/wms',
    this.layer = new VectorLayer({
      source: new VectorSource({
        url: 'http://109.225.108.59:8080/geoserver/Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Workspace%3Ageometri&outputFormat=application%2Fjson&srsname=EPSG:3857',
        format: new GeoJSON({}),
      }),
    });
    this.layer.setOpacity(1);
    this.map.addLayer(this.layer); // lägg på layer på kartan

    /*var vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          'https://ahocevar.com/geoserver/wfs?service=WFS&' +
          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
          'outputFormat=application/json&srsname=EPSG:3857&' +
          'bbox=' +
          extent.join(',') +
          ',EPSG:3006'
        );
      },
      strategy: bboxStrategy,
    });

    this.layer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
      }),
    });

    this.map.addLayer(this.layer);*/

    // Hämta data från GeoServern
    /*this.layer = new ImageLayer({
      source: new ImageWMS({
        params: { 'LAYERS': 'Workspace:geometri' },
        serverType: 'geoserver',
        url: 'http://109.225.108.59:8080/geoserver/Workspace/wms'
      })
    });
    this.layer.setOpacity(0.4);

    this.map.addLayer(this.layer); // lägg på layer på kartan*/

    // Get data with features from GeoServer
    /*this.layer = new VectorLayer({
      source: new VectorSource({
        url: 'http://109.225.108.59:8080/geoserver/Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Workspace%3Ageometri&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
      })
    });
    
    this.layer.setOpacity(0.5);
    this.map.addLayer(this.layer);*/

    this.map.on("click", (e: any) => {
      this.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) { // denna funkar inte, finns inga features at pixel?
        console.log(feature);
        console.log("id: " + feature.id_);
      });
    });

    //sync(this.map);

  }

}