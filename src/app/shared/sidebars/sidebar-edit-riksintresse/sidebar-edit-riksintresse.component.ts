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

  // Receives the id from the parent class (information-sidebar)
  @Input() idOfNationalInterest: number = 1;

  // Data of national interest by id
  nationalInterest: Riksintresse[] = [];

  constructor(private api: ApiService, private dataService: SharedDataService) { }

  ngOnInit(): void {
    // Subscribe to selected id of national interest
    this.dataService.currentId.subscribe((id) => {
      this.idOfNationalInterest = id;
      this.api.getRiksintresse(this.idOfNationalInterest).subscribe((response) => {
        this.nationalInterest = response as Riksintresse[];
      });
    });
    
    /*let intressen = this.api.getRiksintressen().subscribe((response) => {
      if(response[0].id === this.idOfNationalInterest) {
        this.nationalInterest = response as Riksintresse[];
        this.name = this.nationalInterest[0].namn;
      }
    });*/

    //intressen.pipe(filter(a => a.id === this.idOfNationalInterest));
  }

}
