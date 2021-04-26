import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // A list that collects data from the database
  queriedResults : any;
  isVisible: boolean;

  constructor() { 
    this.isVisible = true;

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

  ngOnInit(): void {
  }

  toggleList(visibilityParameter: boolean): void {
    this.isVisible = visibilityParameter;
  }
}
