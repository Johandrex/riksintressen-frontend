import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Riksintresse, RiksintresseList, Geometri, Kommun, Lan, Kulturmiljotyp } from '../classes';
import { ApiService } from './api.service';

/**
 * Class with methods for executing the logic of the program.
 * It also has data to be dealt with.
 */
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private idSource = new BehaviorSubject<number>(0);
  public currentId = this.idSource.asObservable();
  
  public nationalInterests: Riksintresse[] = []; // alla riksintressen
  public nationalInterestsList: RiksintresseList[] = []; // riksintressen listan där riksintressen är kopplade till kommuner, län, kategorier
  public nationalInterestById: Riksintresse = new Riksintresse(); // ett enda riksintresse

  public listGeometries: Geometri[] = []; // register över alla geometries
  public listMunicipalities: Kommun[] = []; // register över alla kommuner
  public listCounties: Lan[] = []; // register över alla län
  public listCategories: Kulturmiljotyp[] = []; // register över alla kategorier

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService) {
    this.subscribeToNationalInterests();
    this.subscribeToNationalInterestsList();
  }

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   */
  public changeIdOfNationalInterestDisplayed(id: number) : void {
    console.log("First: " + this.idSource.value);
    this.idSource.next(id);
    console.log("Then: " + this.idSource.value);
  }

  /**
   * Changes content of national interest array.
   */
  public subscribeToNationalInterests() : void {
    this.api.getRiksintressen().subscribe((response) => {
      this.nationalInterests = response as Riksintresse[];
      console.log(this.nationalInterests);
    })
  }

  /**
   * Changes content of national interest array.
   */
   public subscribeToNationalInterestsList() : void {
    this.api.getRiksintressenList().subscribe((response) => {
      this.nationalInterestsList = response as RiksintresseList[];
      console.log(this.nationalInterestsList);
    })
  }

  /**
   * Changes the national interest found by id.
   */
  public subscribeToSelectedNationalInterest(id: number) : void {
    this.api.getRiksintresse(id).subscribe((response) => {
      this.nationalInterestById = response[0] as Riksintresse; // Only one "riksintresse" is returned to the array
    });
  }

  // Geometries
  public subcribeToGeometries() {
    this.api.getGeometrier().subscribe((response) => {
      this.listGeometries = response;
      console.log(this.listGeometries);
    })
  }

  // Kommuner
  public subcribeToMunicipalities() {
    this.api.getKommuner().subscribe((response) => {
      this.listMunicipalities = response;
      console.log(this.listMunicipalities);
    })
  }

  // Län
  public subcribeToCounties() {
    this.api.getLan().subscribe((response) => {
      this.listCounties = response;
      console.log(this.listCounties);
    })
  }

  // Kategorier / Kulturmiljötyper
  public subcribeToCategories() {
    this.api.getKulturmiljotyper().subscribe((response) => {
      this.listCategories = response;
      console.log(this.listCategories);
    })
  }
}


/* GAMMALT SOM EJ BEHÖVS

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   public changeIdofNationalInterestDisplayed(id: number) : void {
    this.idSource.next(id);
  }

    this.currentId.subscribe((id) => {
      this.api.getRiksintresse(id).subscribe((response) => {
        // Only one "riksintresse" is returned to the array
        this.nationalInterestById = response[0] as Riksintresse;
        console.log(this.nationalInterestById.namn);
      });
    });

*/