import { Component, OnInit, Injectable } from '@angular/core';
import { SharedDataService } from '../../core/services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-information-sidebar',
  templateUrl: './information-sidebar.component.html',
  styleUrls: ['./information-sidebar.component.scss']
})
export class InformationSidebarComponent implements OnInit {

  // Checks whether user has opened this bar or not
  public drawerOpen: boolean = true;

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }

  /* hide or show sidebar menu */
  drawerToggle() {
    let sidebar = document.getElementById('sidebar-right');
    let sidebarDrawer = document.getElementById('sidebar-right-drawer');
    let drawerArrow = document.getElementById('drawer-right-arrow');

    if (this.drawerOpen) {
      this.drawerOpen = false;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.add('sidebar-right-drawer-hide');
        sidebar.classList.add('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-left');
        drawerArrow.classList.remove('raa-icon-arrow-right');
      }
    } else {
      this.drawerOpen = true;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.remove('sidebar-right-drawer-hide');
        sidebar.classList.remove('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-right');
        drawerArrow.classList.remove('raa-icon-arrow-left');
      }
    }
  }

}
