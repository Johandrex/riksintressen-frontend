import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Riksintresse } from '../classes/Riksintresse';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  // All data? 
  data: Riksintresse[] = [];

  // Items to be searched for
  name: any;
  description: any;
  motivation: any;
  diarienumber: any;

  // The current page of data shown in the UI.
  currentPage: number = 1;

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.api.getRiksintressen().subscribe((response) => {
      this.data = response;
      console.log(this.data);
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
  searchDescription() {
    if (this.description == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.description.toLocaleLowerCase().match(this.description.toLocaleLowerCase());
      })
    }
  }
  searchMotivation() {
    if (this.motivation == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.motivation.toLocaleLowerCase().match(this.motivation.toLocaleLowerCase());
      })
    }
  }
  searchDiarienumber() {
    if (this.diarienumber == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.diarienumber.toLocaleLowerCase().match(this.diarienumber.toLocaleLowerCase());
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

}
