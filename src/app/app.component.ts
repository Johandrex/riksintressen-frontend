import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  /**
   * Function is used to show and hide the list with national interests.
   */
  listVisibility: boolean = true;
  toggleVisibility() {
    this.listVisibility = !this.listVisibility;
  }

}