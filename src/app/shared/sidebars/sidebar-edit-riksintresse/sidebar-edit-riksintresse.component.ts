import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Riksintresse } from '../../../core/classes/Riksintresse.model';
import { SharedDataService } from '../../../core/services/shared-data.service';

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['./sidebar-edit-riksintresse.component.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {
  // Attributes
  name: string = "wat";

  constructor(private api: ApiService, private dataService: SharedDataService) { }

  ngOnInit(): void {
    // Subscribe to a selected id of national interest
    this.dataService.currentId.subscribe((id) => {
      this.dataService.subscribeToSelectedNationalInterest(id); // Only one "riksintresse" is returned to the array
      if (this.dataService.nationalInterestById != null) { // kontrollera att det ej är null
        this.name = this.dataService.nationalInterestById.namn;
      }
    });
  }
}
