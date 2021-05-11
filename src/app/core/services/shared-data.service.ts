import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

import { Riksintresse, RiksintresseList, Kommun, Lan, Kulturmiljotyp } from '../classes';

/**
 * Class with methods for executing the logic of the program.
 * It also has data to be dealt with.
 */
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Maintains type of selected information sidebar
  private sidebarSource = new BehaviorSubject<string>("");
  public sidebarCurrent = this.sidebarSource.asObservable();

  // Checks whether user has selected an item from a list to display
  public hasSelectedItem: boolean = false;

  // Maintains the selected national interest
  private idSource = new BehaviorSubject<number>(0);
  public currentId = this.idSource.asObservable();

  public nationalInterestsList: RiksintresseList[] = []; // riksintressen listan där riksintressen är kopplade till kommuner, län, kategorier
  public nationalInterestById: Riksintresse = new Riksintresse(); // ett enda riksintresse

  public listMunicipalities: Kommun[] = []; // register över alla kommuner
  public listCounties: Lan[] = []; // register över alla län
  public listCategories: Kulturmiljotyp[] = []; // register över alla kategorier

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService) {
    this.subscribeToNationalInterestsList();

    this.subcribeToCategories();
    this.subcribeToCounties();
    this.subcribeToMunicipalities();
  }

  /**
   * Changes sidebar based on input.
   * @param sidebar The sidebar that has been selected.
   */
  public changeInformationSidebarDisplayed(sidebar: string): void {
    this.sidebarSource.next(sidebar);
  }

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   */
  public changeIdOfNationalInterestDisplayed(id: number): void {
    this.hasSelectedItem = true;
    this.idSource.next(id);
  }

  /**
   * Changes content of national interest array.
   */
  public subscribeToNationalInterestsList(): void {
    this.api.getRiksintressenList().subscribe((response) => {
      this.nationalInterestsList = response as RiksintresseList[];
      console.log(this.nationalInterestsList);
    })
  }

  /**
   * Changes the national interest found by id.
   */
  public subscribeToSelectedNationalInterest(id: number): void {
    this.api.getRiksintresse(id).subscribe((response) => {
      this.nationalInterestById = response[0] as Riksintresse; // Only one "riksintresse" is returned to the array
    });
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

  // Uppdatera existerande riksintresse
  public updateRiksintresse(object: any) {
    this.api.postUpdateRiksintresse(object);
  }
}