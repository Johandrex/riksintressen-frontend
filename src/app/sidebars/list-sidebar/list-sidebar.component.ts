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
  public name: any;
  public category: any;
  public municipality: any;
  public province: any;

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
   * Query database.
   * @todo Make more abstract if possible.
   */
  searchName() {
    this.dataService.nationalInterestsList = this.dataService.nationalInterestsList.filter(res => {
      return res.namn.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    })
  }
  searchCategory() {
    this.dataService.nationalInterestsList = this.dataService.nationalInterestsList.filter(res => {
      return res.kategorier.toString().toLocaleLowerCase().match(this.category.toLocaleLowerCase()); // konverta från array till string
    })
  }
  searchMunicipality() {
    this.dataService.nationalInterestsList = this.dataService.nationalInterestsList.filter(res => {
      return res.kommuner.toString().toLocaleLowerCase().match(this.municipality.toLocaleLowerCase()); // konverta från array till string
    })
  }
  searchProvince() {
    this.dataService.nationalInterestsList = this.dataService.nationalInterestsList.filter(res => {
      return res.lan.toString().toLocaleLowerCase().match(this.province.toLocaleLowerCase()); // konverta från array till string
    })
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
    this.dataService.changeIdOfNationalInterestDisplayed(value);
  }

}
