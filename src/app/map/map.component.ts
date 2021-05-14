import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public dataService: SharedDataService) { }

  /**
   * Vid initiering av sidan skapas kartan
   */
  ngOnInit(): void {

    this.dataService.createMap();
    this.dataService.getGeoJsonFromServer();
    this.dataService.onClickMap();

  }
}