import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component'

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  buttonList = "lista"
  buttonSearch = "sök"
  buttonHelp = "hjälp"
  buttonMenu = "meny"

  listVisibility : boolean = true;

  constructor(private list: ListComponent) { }

  ngOnInit(): void { }

  /* funktion som tillkallas när anvädnaren trycker på knappen */
  buttonCall(event: any, button: string) {
    console.log('buttonCall', event + " " + button + " trycktes på!");

    /* Dölj / visa listan, funktionen åkallar List modulen där funktionen utförs. */
    if (button == this.buttonList) {
      this.list.toggleVisibility();
    }
  }
}
