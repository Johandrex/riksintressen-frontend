import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MapService } from './map.service';

import { Riksintresse, RiksintresseList, Kommun, Lan, Kulturmiljotyp } from '../classes';

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

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService, public map: MapService) {
    this.subscribeToRiksintressenList();
    this.subcribeToKulturmiljotyper();
    this.subcribeToKommuner();
    this.subcribeToLan();
  }

  // Hämta API url:et
  public getAPI(): string {
    return this.api.url;
  }

  /**
   * Changes current ID based on input.
   * Used when user clicks on a national interest.
   * @param id The ID that has been selected.
   */
  public selectRiksintresse(id: number): void {
    console.log("Sidebar is in mode: " + this.infoSidebarMode.valueOf());

    if (this.infoSidebarMode === this.MODE.HELP || this.infoSidebarMode === this.MODE.INFO) {
      this.infoSidebarMode = this.MODE.INFO;

      // Request national interest from server
      this.subscribeToRiksintresse(id);
      this.subscribeToRiksintresseFiles(id);

      // Välj det geografiska område kopplat till riksintresset
      this.map.selectMapFeature(id);
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

  /**
   * Method for when the user clicks somewhere on the map.
   */
  public onClickMap() {
    this.map.map.on("click", (e: any) => {
      // Executes an arrow function for every overlaying feature clicked at
      this.map.map.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) => {
        if (feature.id_ != undefined) {
          // Split the ID into an array and pick the number to use as input
          let clickedId = parseInt(feature.id_.split(".")[1]);
          this.selectRiksintresse(clickedId);
        }
      });
    });
  }
}