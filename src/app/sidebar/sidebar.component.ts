import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  drawerOpen : boolean = true;

  constructor() { }

  ngOnInit(): void {}

  /* hide or show sidebar menu */
  drawerToggle() {
    let sidebar = document.getElementById('sidebar');
    let sidebarDrawer = document.getElementById('sidebar-drawer');
    let drawerArrow = document.getElementById('drawer-arrow');

    if (this.drawerOpen) {
      this.drawerOpen = false;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.add('sidebar-drawer-hide');
        sidebar.classList.add('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-left');
        drawerArrow.classList.remove('raa-icon-arrow-right');
      }
    } else {
      this.drawerOpen = true;
      if (sidebarDrawer != null && sidebar != null && drawerArrow != null) {
        sidebarDrawer.classList.remove('sidebar-drawer-hide');
        sidebar.classList.remove('sidebar-hide');

        drawerArrow.classList.add('raa-icon-arrow-right');
        drawerArrow.classList.remove('raa-icon-arrow-left');
      }
    }
  }

  getSelectedNationalInterestFromList() {
    //let id: number = this.ListComponent.getIdOfNationalInterest();
  }
}
