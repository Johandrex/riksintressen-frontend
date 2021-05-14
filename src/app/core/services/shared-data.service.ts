import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

import { Riksintresse, RiksintresseList, Kommun, Lan, Kulturmiljotyp } from '../classes';

/* Importerar OpenLayers */
import { View, Feature, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
//import sync from 'ol-hashed';

/**
 * Class with methods for executing the logic of the program.
 * It also has data to be dealt with.
 */
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Hanterar vilket läge som hanteras i sidebaren
  public MODE = { HELP: 'HELP', NEW: 'NEW', INFO: 'INFO', EDIT: 'EDIT' };
  public infoSidebarMode = this.MODE.HELP; // vilken information ska visas i högra spalten vid initiering?

  // Maintains the selected national interest
  private idSource = new BehaviorSubject<number>(0);
  public currentId = this.idSource.asObservable();

  // riksintressen listan där riksintressen är kopplade till kommuner, län, kategorier
  public nationalInterestsList: RiksintresseList[] = [];
  public nationalInterestById: Riksintresse = new Riksintresse(); // ett enda riksintresse

  public listMunicipalities: Kommun[] = []; // register över alla kommuner
  public listCounties: Lan[] = []; // register över alla län
  public listCategories: Kulturmiljotyp[] = []; // register över alla kategorier

  // The map related objects
  public map: any;
  public layer: any;

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService) {
    this.subscribeToNationalInterestsList();
    this.subcribeToCategories();
    this.subcribeToCounties();
    this.subcribeToMunicipalities();
  }

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   */
  public changeIdOfNationalInterestDisplayed(id: number): void {
    this.idSource.next(id);
    this.infoSidebarMode = this.MODE.INFO;

    this.currentId.subscribe((id) => {
      this.subscribeToSelectedNationalInterest(id);
    });

    this.centerOnMap(id);
  }

  // *********************************** Database related ***********************************

  /**
 * Changes the national interest found by id.
 */
  public subscribeToSelectedNationalInterest(id: number): void {
    this.api.getRiksintresse(id).subscribe((response) => {
      this.nationalInterestById = response[0] as Riksintresse; // Only one "riksintresse" is returned to the array
    });
  }

  /**
   * Changes content of national interest array.
   */
  public subscribeToNationalInterestsList(): void {
    this.api.getRiksintressenList().subscribe((response) => {
      this.nationalInterestsList = response as RiksintresseList[];
    });
  }

  // Kommuner
  public subcribeToMunicipalities() {
    this.api.getKommuner().subscribe((response) => {
      this.listMunicipalities = response;
    });
  }

  // Län
  public subcribeToCounties() {
    this.api.getLan().subscribe((response) => {
      this.listCounties = response;
    });
  }

  // Kategorier / Kulturmiljötyper
  public subcribeToCategories() {
    this.api.getKulturmiljotyper().subscribe((response) => {
      this.listCategories = response;
    });
  }

  // Uppdatera existerande riksintresse
  public updateRiksintresse(object: any) {
    this.api.postUpdateRiksintresse(object);
  }

  // Skapa nytt riksintresse
  public newRiksintresse(object: any) {
    this.api.postNewRiksintresse(object);
  }

  // *********************************** Map related methods ***********************************

  /**
   * Create map
   */
  public createMap(): void {
    // Kordinater över visby
    let latitude: number = 18.3278145;
    let longitude: number = 57.6271917;
    // Skapa kartan med position över visby
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM() // openstreetmap
        })
      ],
      view: new View({
        center: fromLonLat([latitude, longitude]),
        zoom: 12
      })
    });
  }

  /**
   * Get data from the geoserver to create a layer with national interests
   */
  public getGeoJsonFromServer() {
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
  }

  /**
   * Method for when the user clicks somewhere on the map
   */
  public onClickMap() {
    this.map.on("click", (e: any) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) => {
        // Split the ID into an array and pick the number to use as input
        let clickedId = parseInt(feature.id_.split(".")[1]);
        this.changeIdOfNationalInterestDisplayed(clickedId);
      });
    });
  }

  /**
   * Center and zoom to national interest on map
   */
  public centerOnMap(id: number) {
    let feature = this.layer.getSource().getFeatureById('geometri.' + id);
    this.map.getView().fit(feature.getGeometry(), { size: this.map.getSize(), maxZoom: 10 });
  }

}