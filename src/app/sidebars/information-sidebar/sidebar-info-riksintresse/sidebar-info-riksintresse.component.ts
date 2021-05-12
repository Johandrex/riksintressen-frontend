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

  currentId!: number;

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { // Subscribe to a selected id of national interest
    this.dataService.currentId.subscribe((id) => {
      this.dataService.subscribeToSelectedNationalInterest(id);
    });
  }

  /**
 * Function to get id of clicked national interest.
 */
  getIdOfClicked(event: any) {
    // Notify observer to keep info-sidebar up to date with selected national interest
    this.dataService.changeIdOfNationalInterestDisplayed(5);
    this.dataService.infoSidebarMode = this.dataService.MODE.EDIT;
  }
}
