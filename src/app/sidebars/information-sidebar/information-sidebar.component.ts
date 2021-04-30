import { Component, OnInit, Injectable } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-information-sidebar',
  templateUrl: './information-sidebar.component.html',
  styleUrls: ['./information-sidebar.component.scss']
})
export class InformationSidebarComponent implements OnInit {

  // Id of displayed national interest
  idOfNationalInterest: number = -1;

  // Checks whether user has opened this bar or not
  drawerOpen : boolean = true;

  constructor(private dataService: SharedDataService) {  }

  ngOnInit(): void {
    // Subscribe to selected id of national interest
    this.dataService.currentId.subscribe(id => this.idOfNationalInterest = id);
  }

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
