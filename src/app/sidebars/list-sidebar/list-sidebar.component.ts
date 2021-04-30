import { Component, Injectable, OnInit } from '@angular/core';
import { Riksintresse } from '../../classes/Riksintresse';
import { ApiService } from '../../api.service';
import { InformationSidebarComponent } from '../information-sidebar/information-sidebar.component';

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
  namn: any;
  beskrivning: any;
  motivering: any;
  diarienummer: any;
  kommun: any;

  // The current page of data shown in the UI.
  currentPage: number = 1;

  // Id of last clicked national interest
  idOfNationalInterest: number = -1;

  constructor(private api: ApiService) {}

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
  searchNamn() {
    if (this.namn == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.namn.toLocaleLowerCase().match(this.namn.toLocaleLowerCase());
      })
    }
  }
  searchBeskrivning() {
    if (this.beskrivning == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.beskrivning.toLocaleLowerCase().match(this.beskrivning.toLocaleLowerCase());
      })
    }
  }
  searchMotivering() {
    if (this.motivering == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.motivering.toLocaleLowerCase().match(this.motivering.toLocaleLowerCase());
      })
    }
  }
  searchDiarienummer() {
    if (this.diarienummer == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.diarienummer.toLocaleLowerCase().match(this.diarienummer.toLocaleLowerCase());
      })
    }
  }
  searchKommun() {
    if (this.diarienummer == "") {
      this.ngOnInit();
    }
    else {
      this.data = this.data.filter(res => {
        return res.diarienummer.toLocaleLowerCase().match(this.diarienummer.toLocaleLowerCase());
      })
    }
  }

  /**
   * Function to sort stuff.
   */
  // Key is the item the list is currently being sorted by
  key: string = "id";
  // Change between sorting in descending and ascending order
  reverse: boolean = false;
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
    // id should never be empty, but just in case...
    if(value > 0) {
      this.idOfNationalInterest = value;
      // Call info bar
    }
  }

}
