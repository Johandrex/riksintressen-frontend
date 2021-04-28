import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NationalInterest } from '../nationalInterest';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  // visibility
  visibility: boolean;

  // All data? 
  data: NationalInterest[] = [];

  // Items to be searched for
  name: any;
  category: any;
  municipality: any;
  province: any;
  lastUpdated: any;

  // The current page of data shown in the UI.
  currentPage: number = 1;

  constructor(public rs: RestService) {
    this.visibility = true;
  }
  ngOnInit(): void {
    this.rs.getNationalInterests().subscribe((response) => {
      this.data = response;
    })
  }

  /**
   * Functions which are executed when user filters list or searches.
   * Query database.
   * @todo Make more abstract if possible.
   */
  searchName() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  searchCategory() {
    if (this.category == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.categories.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
    }
  }
  searchMunicipality() {
    if (this.municipality == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.municipality.toLocaleLowerCase().match(this.municipality.toLocaleLowerCase());
      })
    }
  }
  searchProvince() {
    if (this.province == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.province.toLocaleLowerCase().match(this.province.toLocaleLowerCase());
      })
    }
  }
  searchLastUpdated() {
    if (this.lastUpdated == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.lastUpdated.toLocaleLowerCase().match(this.lastUpdated.toLocaleLowerCase());
      })
    }
  }

  /**
   * Function to sort stuff.
   */
  // Key is the item the list is currently being sorted by
  key: string = "id";
  // Change between sorting in descending and ascending order
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleVisibility() {
    console.log("works" + " " + this.visibility);
    this.visibility = false;
    console.log("works" + " " + this.visibility);
  }

}
