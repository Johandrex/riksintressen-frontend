import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  buttonSearch = "sök"
  buttonNew = "nytt"
  buttonList = "arkiv"
  buttonHelp = "hjälp"

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }

  /* funktion som tillkallas när anvädnaren trycker på knappen */
  buttonCall(event: any, button: string) {
    /* Dölj / visa listan, funktionen åkallar List modulen där funktionen utförs. */
    switch (button) {
      case this.buttonNew:
        this.dataService.infoSidebarMode = this.dataService.MODE.NEW;
        break;
      case this.buttonList: // toggles list
        if (this.dataService.listContainsDeleted == false) {
          this.buttonList = "lista";
          this.dataService.listContainsDeleted = true; // visa vanliga lista
          this.dataService.subscribeToRiksintressenList();
        } else {
          this.buttonList = "arkiv";
          this.dataService.listContainsDeleted = false; // visa lista med raderade(cederade) riksintressen
          this.dataService.subscribeToRiksintressenList();
        }
        break;
      case this.buttonHelp:
        this.dataService.infoSidebarMode = this.dataService.MODE.HELP;
        break;
    }
  }
}
