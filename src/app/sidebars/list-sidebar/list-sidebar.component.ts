import { Component, Injectable, OnInit } from '@angular/core';
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
  // Items to be searched for
  public name = new String();
  public category = new String();
  public municipality = new String();
  public province = new String();

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }

  /* hide or show sidebar menu */
  public drawerOpen: boolean = true;
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
   * @todo Make more abstract if possible.
   */
  public search() {
    this.dataService.listOfFilteredRiksintressen = this.dataService.riksintressenList;
    this.searchName();
    this.searchCategory();
    this.searchMunicipality();
    this.searchProvince();
  }

  private searchName() {
    if (this.name != undefined || this.name != null) {
      this.dataService.listOfFilteredRiksintressen = this.dataService.listOfFilteredRiksintressen.filter(res => {
        return res.namn.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  private searchCategory() {
    if (this.category != undefined || this.category != null) {
      this.dataService.listOfFilteredRiksintressen = this.dataService.listOfFilteredRiksintressen.filter(res => {
        return res.kategorier.toString().toLocaleLowerCase().match(this.category.toLocaleLowerCase()); // konverta från array till string
      })
    }
  }
  private searchMunicipality() {
    if (this.municipality != undefined || this.municipality != null) {
      this.dataService.listOfFilteredRiksintressen = this.dataService.listOfFilteredRiksintressen.filter(res => {
        return res.kommuner.toString().toLocaleLowerCase().match(this.municipality.toLocaleLowerCase()); // konverta från array till string
      })
    }
  }
  private searchProvince() {
    if (this.province != undefined || this.province != null) {
      this.dataService.listOfFilteredRiksintressen = this.dataService.listOfFilteredRiksintressen.filter(res => {
        return res.lan.toString().toLocaleLowerCase().match(this.province.toLocaleLowerCase()); // konverta från array till string
      })
    }
  }

  /**
   * Function to sort stuff.
   */
  public key: string = "namn"; // Key is the item the list is currently being sorted by
  public reverse: boolean = false; // Change between sorting in descending and ascending order
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
    // Notify observer to keep info-sidebar up to date with selected national interest
    this.dataService.selectRiksintresse(value);
  }

}
