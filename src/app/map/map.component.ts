import { Component, OnInit } from '@angular/core';
import { MapService } from '../core/services/map.service';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  constructor(private map: MapService, private dataService: SharedDataService) { }

  /**
   * Vid initiering av sidan skapas kartan med hjälp av map och shared data services
   */
  ngOnInit(): void {
    this.map.createMap();
    this.map.getGeoJsonFromServer();
    this.dataService.onClickMap();
  }
}