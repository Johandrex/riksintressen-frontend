import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedDataService } from '../../../core/services/shared-data.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-sidebar-info-riksintresse',
  templateUrl: './sidebar-info-riksintresse.component.html',
  styleUrls: ['./sidebar-info-riksintresse.component.scss']
})
export class SidebarInfoRiksintresseComponent implements OnInit {

  public hasSelectedItem : boolean = false;

  // form kontroller för <ng-select>
  selectKategorier = new FormControl();

  constructor(public dataService: SharedDataService) { }

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
    });
  }

}
