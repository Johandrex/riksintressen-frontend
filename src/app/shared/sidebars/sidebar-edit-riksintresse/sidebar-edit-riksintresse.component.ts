import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Riksintresse } from '../../../core/classes/Riksintresse.model';
import { SharedDataService } from '../../../core/services/shared-data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['./sidebar-edit-riksintresse.component.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {

  // Data of national interest by id
  nationalInterest: Riksintresse = new Riksintresse();

  constructor(private api: ApiService, private dataService: SharedDataService) { }

  ngOnInit(): void {
    this.nationalInterest = this.dataService.subscribeToSelectedNationalInterest();
    // Subscribe to selected id of national interest
    /*this.dataService.currentId.subscribe((id) => {
      this.api.getRiksintresse(id).subscribe((response) => {
        // Only one "riksintresse" is returned to the array
        this.nationalInterest = response[0] as Riksintresse;
      });
    });*/
  }

}
