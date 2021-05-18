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
  public MODE = { HELP: 'HELP', NEW: 'NEW', INFO: 'INFO', EDIT: 'EDIT', UPLOAD: 'UPLOAD' };
  public infoSidebarMode = this.MODE.HELP; // vilken information ska visas i högra spalten vid initiering?

  // Ska cederade riksintressen visas i listan?
  public displayDeleted = false;

  // Maintains the selected national interest
  private idSource = new BehaviorSubject<number>(0);
  public currentId = this.idSource.asObservable();

  // riksintressen listan där riksintressen är kopplade till kommuner, län, kategorier
  public nationalInterestByIdFiles: any = []; // ett riksintresses filer i JSON format
  public nationalInterestById: Riksintresse = new Riksintresse(); // ett enda riksintresse
  public nationalInterestsList: RiksintresseList[] = [];
  public listMunicipalities: Kommun[] = []; // register över alla kommuner
  public listCounties: Lan[] = []; // register över alla län
  public listCategories: Kulturmiljotyp[] = []; // register över alla kategorier

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
    this.subscribeToNationalInterestsList();
    this.subcribeToCategories();
    this.subcribeToCounties();
    this.subcribeToMunicipalities();
  }

  // *********************************** General user interaction ***********************************

  /**
   * Changes current ID based on input.
   * Used when user clicks on a national interest.
   * @param id The ID that has been selected.
   */
  public changeIdOfNationalInterestDisplayed(id: number): void {
    console.log(this.infoSidebarMode.valueOf());
    if (this.infoSidebarMode === this.MODE.HELP || this.infoSidebarMode === this.MODE.INFO) {
      this.idSource.next(id);
      this.infoSidebarMode = this.MODE.INFO;

      // Request national interest from server
      this.currentId.subscribe((id) => {
        this.subscribeToSelectedNationalInterest(id);
      });

      // These are in this method so it's also activated when user is selecting 
      // a national interest from the list.
      this.selectMapFeature(id);
    }
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
   * Hämta ett riksintresses filer
   * @param id 
   */
  public subscribeToSelectedNationalInterestFiles(id: number): void {
    this.api.getFiles(id).subscribe((response) => {
      console.log(response);
      this.nationalInterestByIdFiles = response; // Only one "riksintresse" is returned to the array
    });
  }

  /**
   * Changes content of national interest array.
   * Välj att visa raderade(cederade) eller ej raderade riksintressen
   * @returns A list with national interest that is continuosly updated.
   */
  public subscribeToNationalInterestsList(): RiksintresseList[] {
    if (this.displayDeleted) {
      this.api.getRiksintressenListDeleted().subscribe((response) => {
        this.nationalInterestsList = response as RiksintresseList[];
      });
    } else {
      this.api.getRiksintressenList().subscribe((response) => {
        this.nationalInterestsList = response as RiksintresseList[];
      });
    }
    return this.nationalInterestsList;
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

  // Ladda upp dokument / bild
  public async upload(object: any) {
    await this.api.upload(object);
  }

  // Uppdatera existerande riksintresse
  public async updateRiksintresse(object: any) {
    await this.api.postUpdateRiksintresse(object); // async för att säkerställa ett ett riksintresse postas innan vi går vidare i metoden
    this.changeIdOfNationalInterestDisplayed(this.nationalInterestById.id); // hämta den nya informationen om det nuvarande id:et
    this.subscribeToNationalInterestsList(); // hämta listan över riksintressena på nytt
  }

  // Skapa nytt riksintresse
  public async newRiksintresse(object: any) {
    let data = await this.api.postNewRiksintresse(object);
    this.changeIdOfNationalInterestDisplayed(data.id); // hämta den nya informationen om det nuvarande id:et
    this.subscribeToNationalInterestsList(); // hämta listan över riksintressena på nytt
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
          this.changeIdOfNationalInterestDisplayed(clickedId);
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
    /*var interactionToBeRemoved1;
    var interactionToBeRemoved2;
    this.map.getInteractions().forEach(function (interaction: Interaction) {
      if (interaction instanceof Draw) {
        interactionToBeRemoved1 = interaction;
      }
      else if (interaction instanceof Snap) {
        interactionToBeRemoved2 = interaction;
      }
    });
    // Remove the interactions from the map
    if (interactionToBeRemoved1) { this.map.removeInteraction(interactionToBeRemoved1); }
    if (interactionToBeRemoved2) { this.map.removeInteraction(interactionToBeRemoved2); }*/
    this.isUnableToSelectFeature = false;
    if (this.draw) { this.map.removeInteraction(this.draw); }
    if (this.snap) { this.map.removeInteraction(this.snap); }
    if (this.modifyCreate) { this.map.removeInteraction(this.modifyCreate); }
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
    /*var modifyToBeRemoved;
    this.map.getInteractions().forEach(function (interaction: Interaction) {
      if (interaction instanceof Draw) {
        modifyToBeRemoved = interaction;
      }
    });*/
    this.isUnableToSelectFeature = false;
    this.map.removeInteraction(this.modify);
  }
}