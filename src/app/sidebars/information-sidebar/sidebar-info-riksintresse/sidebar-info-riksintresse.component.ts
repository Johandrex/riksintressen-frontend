import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedDataService } from '../../../core/services/shared-data.service';

@Component({
  selector: 'app-sidebar-info-riksintresse',
  templateUrl: './sidebar-info-riksintresse.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarInfoRiksintresseComponent implements OnInit {

  public getStaticURL = this.dataService.getStaticAPI(); // url till API
  public selectKategorier = new FormControl(); // form kontroller för <ng-select>

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }

  /**
   * Function to switch infoSidebarMode
   */
  getIdOfClicked() {
    this.dataService.infoSidebarMode = this.dataService.MODE.EDIT;
  }

  buttonViewFiles() {
    this.dataService.infoSidebarMode = this.dataService.MODE.FILES_VIEW;
  }
}
