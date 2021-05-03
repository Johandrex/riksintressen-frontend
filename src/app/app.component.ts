import { Component, OnInit } from "@angular/core";
import { ApiService } from './core/services/api.service';

import { Riksintresse, Geometri, Kommun, Lan, Kulturmiljotyp } from './core/classes';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Register över kommuner, lan, kulturmiljötyper som återanvänds när applikationen är igång
  registerRiksintressen: Riksintresse[] = [];
  registerGeometrier: Geometri[] = [];
  registerKommuner: Kommun[] = [];
  registerLan: Lan[] = [];
  registerKulturmiljotyper: Kulturmiljotyp[] = [];

  constructor(private api: ApiService) {}

  // Initiera register från API
  ngOnInit(): void {
    this.api.getRiksintressen().subscribe((response) => {
      this.registerRiksintressen = response;
      console.log(this.registerRiksintressen);
    })

    this.api.getGeometrier().subscribe((response) => {
      this.registerGeometrier = response;
      console.log(this.registerGeometrier);
    })

    this.api.getKommuner().subscribe((response) => {
      this.registerKommuner = response;
      console.log(this.registerKommuner);
    })

    this.api.getLan().subscribe((response) => {
      this.registerLan = response;
      console.log(this.registerLan);
    })

    this.api.getKulturmiljotyper().subscribe((response) => {
      this.registerKulturmiljotyper = response;
      console.log(this.registerKulturmiljotyper);
    })
  }

  listVisibility: boolean = true;

  /**
   * Function is used to show and hide the list with national interests.
   */
  toggleList() {
    this.listVisibility = !this.listVisibility;
  }

}