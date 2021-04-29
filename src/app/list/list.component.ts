import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Riksintresse } from '../classes/Riksintresse';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  // All data? 
  data: Riksintresse[] = [];

  // Items to be searched for
  namn: any;
  beskrivning: any;
  motivering: any;
  diarienummer: any;

  kommun: any;

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
  searchNamn() {
    if (this.namn == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.namn.toLocaleLowerCase().match(this.namn.toLocaleLowerCase());
      })
    }
  }
  searchBeskrivning() {
    if (this.beskrivning == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.beskrivning.toLocaleLowerCase().match(this.beskrivning.toLocaleLowerCase());
      })
    }
  }
  searchMotivering() {
    if (this.motivering == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.motivering.toLocaleLowerCase().match(this.motivering.toLocaleLowerCase());
      })
    }
  }
  searchDiarienummer() {
    if (this.diarienummer == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.diarienummer.toLocaleLowerCase().match(this.diarienummer.toLocaleLowerCase());
      })
    }
  }
  searchKommun() {
    if (this.diarienummer == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.diarienummer.toLocaleLowerCase().match(this.diarienummer.toLocaleLowerCase());
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
