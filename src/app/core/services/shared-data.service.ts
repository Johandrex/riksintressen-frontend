import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Riksintresse, RiksintresseList } from '../classes';
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

  // fyll nationalInterests och nationalInterestsList med data
  constructor(private api: ApiService) {
    this.subscribeToNationalInterests();
    this.subscribeToNationalInterestsList();
  }

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   */
  public changeIdofNationalInterestDisplayed(id: number) : void {
    this.idSource.next(id);
  }

  /**
   * Changes content of national interest array.
   */
  public subscribeToNationalInterests() : void {
    this.api.getRiksintressen().subscribe((response) => {
      this.nationalInterests = response as Riksintresse[];
    })
  }

  /**
   * Changes content of national interest array.
   */
   public subscribeToNationalInterestsList() : void {
    this.api.getRiksintressenList().subscribe((response) => {
      this.nationalInterestsList = response as RiksintresseList[];
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