import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';


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

  constructor(public list: ListComponent){}

  ngOnInit(): void {
  }

  /* funktion som tillkallas när anvädnaren trycker på knappen */
  buttonCall(event: any, button: string) {
    console.log('buttonCall', event + " " + button + " trycktes på!");

    if (button == this.buttonList) {
      this.toggleList();
    }
  }


  /* Dölj / visa listan */
  toggleList(): void {
    this.list.toggleList();
  }
}
