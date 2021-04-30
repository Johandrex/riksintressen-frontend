import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Riksintresse } from '../../../classes/Riksintresse';

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['./sidebar-edit-riksintresse.component.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {

  // Receives the id from the parent class (information-sidebar)
  @Input() idOfNationalInterest: number = -1;

  // Data of national interest by id
  dataOfNationalInterest: Riksintresse[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
      this.api.getRiksintresse(this.idOfNationalInterest).subscribe((response) => {
        this.dataOfNationalInterest = response;
        console.log(response);
      });
  }

}
