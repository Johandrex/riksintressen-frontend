import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedDataService } from '../../../core/services/shared-data.service';

@Component({
  selector: 'app-sidebar-info-riksintresse',
  templateUrl: './sidebar-info-riksintresse.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarInfoRiksintresseComponent implements OnInit {

  // form kontroller för <ng-select>
  selectKategorier = new FormControl();

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { // Subscribe to a selected id of national interest
  }

  /**
 * Function to get id of clicked national interest.
 */
  getIdOfClicked(event: any) {
    //let tempId = this.dataService.nationalInterestById;

    // Notify observer to keep info-sidebar up to date with selected national interest
    this.dataService.infoSidebarMode = this.dataService.MODE.EDIT;
  }
}
