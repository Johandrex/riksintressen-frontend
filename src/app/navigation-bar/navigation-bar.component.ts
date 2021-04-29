import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

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

  constructor(private app: AppComponent) { }

  ngOnInit(): void { }

  /* funktion som tillkallas när anvädnaren trycker på knappen */
  buttonCall(event: any, button: string) {
    /* Dölj / visa listan, funktionen åkallar List modulen där funktionen utförs. */
    if (button == this.buttonList) {
      this.app.toggleList();
    }
  }
}
