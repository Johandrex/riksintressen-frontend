import { Component, Injectable, OnInit } from '@angular/core';
import { Riksintresse } from '../../core/classes/Riksintresse.model';
import { ApiService } from '../../core/services/api.service';
import { SharedDataService } from '../../core/services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-list-sidebar',
  templateUrl: './list-sidebar.component.html',
  styleUrls: ['./list-sidebar.component.scss']
})
export class ListSidebarComponent implements OnInit {

  // All data? 
  data: Riksintresse[] = [];

  // Items to be searched for
  name: any;
  category: any;
  municipality: any;
  province: any;

  // The current page of data shown in the UI.
  currentPage: number = 1;

  constructor(private api: ApiService, private dataService: SharedDataService) {}

  ngOnInit(): void {
    this.api.getRiksintressen().subscribe((response) => {
      this.data = response;
    })
  }

  drawerOpen : boolean = true;

  /* hide or show sidebar menu */
  drawerToggle() {
    let sidebar = document.getElementById('sidebar-left');
    let sidebarDrawer = document.getElementById('sidebar-left-drawer');
    let drawerArrow = document.getElementById('drawer-left-arrow');

    if (this.drawerOpen) {
      this.drawerOpen = false;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.add('sidebar-left-drawer-hide');
        sidebar.classList.add('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-right');
        drawerArrow.classList.remove('raa-icon-arrow-left');
      }
    } else {
      this.drawerOpen = true;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.remove('sidebar-left-drawer-hide');
        sidebar.classList.remove('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-left');
        drawerArrow.classList.remove('raa-icon-arrow-right');
      }
    }
  }

  /**
   * Functions which are executed when user filters list or searches.
   * Query database.
   * @todo Make more abstract if possible.
   */
  searchName() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.namn.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  searchCategory() {
    if (this.category == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.beskrivning.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
    }
  }
  searchMunicipality() {
    if (this.municipality == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.namn.toLocaleLowerCase().match(this.municipality.toLocaleLowerCase());
      })
    }
  }
  searchProvince() {
    if (this.province == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.motivering.toLocaleLowerCase().match(this.province.toLocaleLowerCase());
      })
    }
  }

  /**
   * Function to sort stuff.
   */
  // Key is the item the list is currently being sorted by
  public key: string = "id";
  // Change between sorting in descending and ascending order
  public reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  /**
   * Function to get id of clicked national interest.
   */
  getIdOfClicked(event: any) {
    // Check the id of the item clicked on
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    if(value > 0) {
      // Notify observer to keep info-sidebar up to date with selected national interest
      this.dataService.changeIdofNationalInterestDisplayed(value);
    }
  }

}
