import { Injectable, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  // visibility
  visibility: boolean = true;

  // A list that collects data from the database
  queriedResults : any;

  // Name searched for by user
  searchedName: string = '';
  nameOfObject = new FormControl('');

  constructor() { 
    this.queriedResults = [
      { 
        "id":"T1", 
        "name":"Ramundeboda", 
        "categories":["Klostermiljö"], 
        "municipality":"Laxå", 
        "province":"Örebro", 
        "lastUpdated":"1996-03-25"
      },
      { 
        "id":"T53", 
        "name":"Skagershult - Bålby", 
        "categories":["Kyrkomiljö", "Herrgårdsmiljö"], 
        "municipality":"Laxå", 
        "province":"Örebro", 
        "lastUpdated":"1996-03-25"
      },
    ];
  }

  /**
   * Function which is executed when user filters list or searches.
   * Query database.
   */
  filterList() {
    console.log('it does nothing', this.searchedName);
  }

  toggleVisibility() {
    console.log("works" + " " + this.visibility);
    this.visibility = false;
    console.log("works" + " " + this.visibility);
    }
}
