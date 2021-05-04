import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Riksintresse } from '../classes';
import { ApiService } from './api.service';

/**
 * Class with methods for executing the logic of the program.
 * It also has data to be dealt with.
 */
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Selected ID
  private idSource = new BehaviorSubject<number>(0);
  currentId = this.idSource.asObservable();

  // Retrieved list of national interests from database
  private nationalInterests: Riksintresse[] = [];
  public getNationalInterests() : Riksintresse[] {
    return this.nationalInterests;
  }

  // Rertrieved national interest by id
  private nationalInterestById: Riksintresse = new Riksintresse();
  public getNationalInterestById() : Riksintresse {
    return this.nationalInterestById;
  }

  constructor(private api: ApiService) { }

  /**
   * Changes ID based on input.
   * @param id The ID that has been selected.
   */
  public changeIdofNationalInterestDisplayed(id: number) : void {
    this.idSource.next(id);
  }

  /**
   * Changes content of national interest array.
   * 
   */
  public subscribeToNationalInterests() : void {
    this.api.getRiksintressen().subscribe((response) => {
      this.nationalInterests = response as Riksintresse[];
    })
  }

  /**
   * Changes the national interest found by id.
   * 
   */
  public subscribeToSelectedNationalInterest() : void {
    // Subscribe to selected id of national interest
    this.currentId.subscribe((id) => {
      this.api.getRiksintresse(id).subscribe((response) => {
        // Only one "riksintresse" is returned to the array
        this.nationalInterestById = response[0] as Riksintresse;
      });
    });
  }

  

}