import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {

  // formuläret
  form!: any;

  constructor(public dataService: SharedDataService) {
    this.form = new FormGroup({
      namn: new FormControl(this.dataService.nationalInterestById.namn),
      beskrivning: new FormControl(this.dataService.nationalInterestById.beskrivning),
      motivering: new FormControl(this.dataService.nationalInterestById.motivering),
      cederat: new FormControl(this.dataService.nationalInterestById.cederat),
    })
  }

  ngOnInit(): void { }

  // för objekt av formulärets data som skickas via HTTP post
  buttonSubmit() {
    let form = this.form.value;
    form["id"] = this.dataService.nationalInterestById.id;
    form["kategorier"] = this.dataService.nationalInterestById.kategorier;

    this.dataService.updateRiksintresse(form); // uppdatera o visa informations sidebar
    console.log(form);
  }

  buttonCancel() {
    this.dataService.infoSidebarMode = this.dataService.MODE.INFO;
  }

  /**
   * Executes a feature edit mode when user clicks draw polygon button.
   */
  private toggleDrawPolygon: boolean = false;
  public drawPolygon(): void {
    if (this.toggleDrawPolygon === false) {
      this.toggleDrawPolygon = true;
      this.dataService.startEditMapFeature();
    }
    else {
      this.toggleDrawPolygon = false;
      this.dataService.stopEditMapFeature();
    }
  }

}
