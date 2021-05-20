import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Riksintresse, RiksintresseList, Kommun, Lan, Kulturmiljotyp } from '../classes';

/* Importerar OpenLayers */
import { View, Feature, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { altKeyOnly, always, click, never, pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import { Draw, Interaction, Modify, Snap } from 'ol/interaction';
import Polygon from 'ol/geom/Polygon';
import GeometryType from 'ol/geom/GeometryType';
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
  public MODE = { HELP: 'HELP', NEW: 'NEW', INFO: 'INFO', EDIT: 'EDIT', FILES_UPLOAD: 'FILES_UPLOAD', FILES_VIEW: 'VIEW_FILES' };
  public infoSidebarMode = this.MODE.HELP; // vilken information ska visas i högra spalten vid initiering?
  public listContainsDeleted = false; // Ska cederade riksintressen visas i listan?

  // riksintressen listan där riksintressen är kopplade till kommuner, län, kategorier
  public riksintresseFiles: any = []; // ett riksintresses filer i JSON format (ENDAST BILDER)
  public riksintressePhotos: any = []; // ett riksintresses filer i JSON format (BILDER + DOCUMENT)
  public riksintresse: Riksintresse = new Riksintresse(); // ett enda riksintresse
  public riksintressenList: RiksintresseList[] = []; // Complete list of all national interests

  public listOfFilteredRiksintressen: RiksintresseList[] = []; // List of national interests filtered by input
  public listKommuner: Kommun[] = []; // register över alla kommuner
  public listLan: Lan[] = []; // register över alla län
  public listKulturmiljotyper: Kulturmiljotyp[] = []; // register över alla kategorier

  // *************** The map related properties ***************
  // Map with layer of map tiles and the layer below
  public map: any;
  // The layer used for all map features associated with the national interests
  public layer: any;
  // Geoserver source used to create and edit features
  public vectorSource: any;
  // Current selected map feature (singe click)
  public selectInteraction = new Select(
    {
      condition: never,
      style: new Style({ fill: new Fill({ color: '#009605' }) })
    }
  );
  public isUnableToSelectFeature: boolean = false;

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService) {
    this.subscribeToRiksintressenList();
    this.subcribeToKulturmiljotyper();
    this.subcribeToKommuner();
    this.subcribeToLan();
  }

  // Hämta API url:et
  public getAPI(): string {
    return this.api.url;
  }

  // *********************************** General user interaction ***********************************

  /**
   * Changes current ID based on input.
   * Used when user clicks on a national interest.
   * @param id The ID that has been selected.
   */
  public selectRiksintresse(id: number): void {
    console.log(this.infoSidebarMode.valueOf());
    if (this.infoSidebarMode === this.MODE.HELP || this.infoSidebarMode === this.MODE.INFO) {
      this.infoSidebarMode = this.MODE.INFO;

      // Request national interest from server
      this.subscribeToRiksintresse(id);
      this.subscribeToRiksintresseFiles(id);

      // These are in this method so it's also activated when user is selecting 
      // a national interest from the list.
      this.selectMapFeature(id);
    }
  }

  // *********************************** Database related ***********************************

  /**
   * Changes the national interest found by id.
   */
  public subscribeToRiksintresse(id: number): void {
    this.api.getRiksintresse(id).subscribe((response) => {
      console.log("Valde riksintresse " + id);
      this.riksintresse = response[0] as Riksintresse; // Only one "riksintresse" is returned to the array
    });
  }

  /**
   * Hämta ett riksintresses filer och lägg bilder i en egen array
   * @param id 
   */
  public subscribeToRiksintresseFiles(id: number): void {
    this.api.getFiles(id).subscribe((response) => {
      this.riksintresseFiles = response;

      // Kontrollera filändelsen och lägg bilder i en egen array
      if (response[0] != undefined) {
        this.riksintressePhotos = // att fixa

          response.forEach((obj) => { // TODO: COMPLETE
            let ext = obj.url.substring(obj.url.lastIndexOf('.') + 1);
            if (ext == ".png" || ext == ".jpg")
              this.riksintressePhotos.push(obj); // lägg till i array ifall det är en bild
          });
      }
    });
  }

  /**
   * Changes content of national interest array.
   * Välj att visa raderade(cederade) eller ej raderade riksintressen
   * @returns A list with national interest that is continuosly updated.
   */
  public subscribeToRiksintressenList(): RiksintresseList[] {
    if (this.listContainsDeleted) {
      this.api.getRiksintressenListDeleted().subscribe((response) => {
        this.riksintressenList = response as RiksintresseList[];
        this.listOfFilteredRiksintressen = this.riksintressenList;
      });
    } else {
      this.api.getRiksintressenList().subscribe((response) => {
        this.riksintressenList = response as RiksintresseList[];
        this.listOfFilteredRiksintressen = this.riksintressenList;
      });
    }

    return this.riksintressenList;
  }

  // Kommuner
  public subcribeToKommuner() {
    this.api.getKommuner().subscribe((response) => {
      this.listKommuner = response;
    });
  }

  // Län
  public subcribeToLan() {
    this.api.getLan().subscribe((response) => {
      this.listLan = response;
    });
  }

  // Kategorier / Kulturmiljötyper
  public subcribeToKulturmiljotyper() {
    this.api.getKulturmiljotyper().subscribe((response) => {
      this.listKulturmiljotyper = response;
    });
  }

  // Ladda upp dokument / bild
  public async upload(object: any) {
    await this.api.postFiles(object);
  }

  // Uppdatera existerande riksintresse
  public async updateRiksintresse(object: any) {
    await this.api.postUpdateRiksintresse(object); // async för att säkerställa ett ett riksintresse postas innan vi går vidare i metoden
    this.selectRiksintresse(this.riksintresse.id); // hämta den nya informationen om det nuvarande id:et
    this.subscribeToRiksintressenList(); // hämta listan över riksintressena på nytt
  }

  // Skapa nytt riksintresse
  public async newRiksintresse(object: any) {
    let data = await this.api.postNewRiksintresse(object);
    this.selectRiksintresse(data.id); // hämta den nya informationen om det nuvarande id:et
    this.subscribeToRiksintressenList(); // hämta listan över riksintressena på nytt
  }

  // *********************************** Map related methods ***********************************

  /**
   * Initiate and create map.
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
   * Get data from the geoserver to create a layer with national interests.
   */
  public getGeoJsonFromServer() {
    // Initialise source
    this.vectorSource = new VectorSource({
      // Make sure to configure the URL according to your needs
      url: 'http://109.225.108.59:8080/geoserver/Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Workspace%3Ageometri&outputFormat=application%2Fjson&srsname=EPSG:3857',
      format: new GeoJSON()
    });
    // Hämta data från GeoServern
    this.layer = new VectorLayer({
      source: this.vectorSource,
    });
    this.layer.setOpacity(1);
    this.map.addLayer(this.layer); // lägg på layer på kartan
  }

  /**
   * Method for when the user clicks somewhere on the map.
   */
  public onClickMap() {
    this.map.on("click", (e: any) => {
      // Executes an arrow function for every overlaying feature clicked at
      this.map.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) => {
        if (feature.id_ != undefined) {
          // Split the ID into an array and pick the number to use as input
          let clickedId = parseInt(feature.id_.split(".")[1]);
          this.selectRiksintresse(clickedId);
        }
      });
    });
  }

  /**
   * Selects a feature on the map to mark it.
   * @param id ID of item on map
   */
  public selectMapFeature(id: number) {
    try {
      let feature = this.layer.getSource().getFeatureById('geometri.' + id);
      // Remove previous selected feature, if any
      this.selectInteraction.getFeatures().clear();
      // Add newly selected feature
      this.selectInteraction.getFeatures().push(feature);
      // Display the select style for feature
      this.map.addInteraction(this.selectInteraction);
      // Center and zoom to feature on map
      this.map.getView().fit(feature.getGeometry(), {
        size: this.map.getSize(),
        maxZoom: this.map.getView().getZoom(),
        padding: [100, 100, 100, 100],
        style: { strokeColor: '#009605' },
      });
    }
    catch (e) {
      console.log("Exception at centerOnMapFeature() " + e);
    }
  }

  /**
   * Creates a new map feature.
   */
  public draw: any;
  public snap: any;
  public modifyCreate: any;
  public startCreateMapFeature(): void {
    this.isUnableToSelectFeature = true;
    this.modifyCreate = new Modify({ source: this.vectorSource });
    this.map.addInteraction(this.modifyCreate);

    this.draw = new Draw({
      source: this.vectorSource,
      type: GeometryType.MULTI_POLYGON
    });
    this.map.addInteraction(this.draw);

    this.snap = new Snap({ source: this.vectorSource });
    this.map.addInteraction(this.snap);

    // Save the feature vector?
    // Stop the interaction when finished
  }

  /**
   * Removes the interactions of creating a map feature.
   */
  public stopCreateMapFeature(): void {
    // Find the seeked after interaction on the map
    this.isUnableToSelectFeature = false;
    if (this.draw) { this.map.removeInteraction(this.draw); }
    if (this.snap) { this.map.removeInteraction(this.snap); }
    if (this.modifyCreate) { this.map.removeInteraction(this.modifyCreate); }
    // Store change in database
  }

  /**
   * Modify an existing map feature.
   */
  public modify: any;
  public startEditMapFeature(): void {
    this.isUnableToSelectFeature = true;
    this.modify = new Modify({
      source: this.vectorSource,
      features: this.selectInteraction.getFeatures(),
    });
    this.map.addInteraction(this.modify);
    // Stop the interaction when finished
  }

  /**
   * Removes the interaction of editting a map feature.
   */
  public stopEditMapFeature(): void {
    this.isUnableToSelectFeature = false;
    if (this.modify) { this.map.removeInteraction(this.modify); }
    // Store change in database
  }
}