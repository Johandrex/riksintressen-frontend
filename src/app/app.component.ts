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
  ngOnInit(): void { }

  listVisibility: boolean = true;

  /**
   * Function is used to show and hide the list with national interests.
   */
  toggleList() {
    this.listVisibility = !this.listVisibility;
  }

}