import { Component, OnInit } from "@angular/core";
import { Register } from './classes/Register';
import { ApiService } from './services/api.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data: Register[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getKommuner().subscribe((response) => {
      this.data = response;
    })

    this.api.getLan().subscribe((response) => {
      this.data = response;
    })

    this.api.getKulturmiljotyper().subscribe((response) => {
      this.data = response;
    })
  }

  listVisibility: boolean = true;

  /**
   * Function is used to show and hide the list with national interests.
   */
  toggleList() {
    this.listVisibility = !this.listVisibility;
  }

}