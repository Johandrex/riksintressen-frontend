import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listVisibility: boolean = true;

  constructor() {}

  ngOnInit() {
  }

  /**
   * Function is used to show and hide the list with national interests.
   */
  toggleList() {
    this.listVisibility = !this.listVisibility;
  }

}