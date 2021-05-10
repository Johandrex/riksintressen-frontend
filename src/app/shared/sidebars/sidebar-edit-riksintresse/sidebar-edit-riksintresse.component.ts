import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { SharedDataService } from '../../../core/services/shared-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['./sidebar-edit-riksintresse.component.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {

  public hasSelectedItem : boolean = false;

  selectKategorier = new FormControl(); // för <ng-select>
  kategorier: string[] = [];

  constructor(private api: ApiService, public dataService: SharedDataService) { }

  ngOnInit(): void { // Subscribe to a selected id of national interest
    this.dataService.currentId.subscribe((id) => {
      if(id == null) {
        this.hasSelectedItem = false;
      }
      else {
        this.hasSelectedItem = true;
      }
      // Only one "riksintresse" is returned to the array
      this.dataService.subscribeToSelectedNationalInterest(id);

      this.kategorier = this.dataService.nationalInterestById.kategorier
    });
  }


}
