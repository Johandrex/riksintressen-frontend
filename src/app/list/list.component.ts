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
  styleUrls: ['./list.component.scss', '../../assets/raa/scss/raa-normalize.scss']
})
export class ListComponent implements OnInit {
  // All data? 
  data: NationalInterest[] = [];

  // Name searched for by user
  name: any = '';

  constructor(public rs: RestService) { 

  }
  ngOnInit(): void {
    this.rs.getNationalInterests().subscribe((response) => {
      this.data = response;
    })
  }

  /**
   * Function which is executed when user filters list or searches.
   * Query database.
   */
  search() {
    console.log('it does nothing', this.name);
    if(this.name = "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  /* dölja / visa listan */
  toggleList(): void {
    // ska fixa
  }
}
