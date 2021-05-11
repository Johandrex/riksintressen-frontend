import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-sidebar-edit-riksintresse',
  templateUrl: './sidebar-edit-riksintresse.component.html',
  styleUrls: ['./sidebar-edit-riksintresse.component.scss']
})
export class SidebarEditRiksintresseComponent implements OnInit {

  // form kontroller för <ng-select>
  selectKategorier = new FormControl();

  // formuläret
  form: FormGroup;

  constructor(public fb: FormBuilder, public dataService: SharedDataService) {
    this.form = new FormGroup({
      namn: new FormControl(),
      beskrivning: new FormControl(),
      motivering: new FormControl(),
      cederat: new FormControl(),
    })
  }

  ngOnInit(): void { // Subscribe to a selected id of national interest
    this.dataService.currentId.subscribe((id) => {
      this.dataService.subscribeToSelectedNationalInterest(id);
    });
  }

  // för HTTP post av formulärets data
  submitForm() {
    let form = this.form.value;
    form["id"] = this.dataService.nationalInterestById.id;
    form["kategorier"] = this.dataService.nationalInterestById.kategorier;

    this.dataService.updateRiksintresse(form);
  }

}
