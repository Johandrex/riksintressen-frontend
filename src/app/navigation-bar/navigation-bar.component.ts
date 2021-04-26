import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(public list: ListComponent){}

  listButton: boolean = true;


  ngOnInit(): void {
  }

  get isSidebarVisible(): boolean {
    return this.list.isVisible;
}

  /* Dölj / visa listan */
  toggleList(): void {
    if (this.listButton == true) {
      this.listButton = false;
      this.list.toggleList(false);
    } else {
      this.listButton = true;
      this.list.toggleList(true);

    }
  }

}
