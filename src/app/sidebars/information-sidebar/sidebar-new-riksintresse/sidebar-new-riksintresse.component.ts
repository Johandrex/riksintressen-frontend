import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-sidebar-new-riksintresse',
  templateUrl: './sidebar-new-riksintresse.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarNewRiksintresseComponent implements OnInit {

  // värdena som formuläret sparat till
  kategorier!: any;
  kommuner!: any;
  lan!: any;

  // formuläret
  form: FormGroup;

  constructor(public fb: FormBuilder, public dataService: SharedDataService) {
    this.form = new FormGroup({
      namn: new FormControl(),
      beskrivning: new FormControl(),
      motivering: new FormControl(),
    })
  }

  ngOnInit(): void { }

  // för objekt av formulärets data som skickas via HTTP post
  submitForm() {
    let form = this.form.value;
    form["kategorier"] = this.kategorier;
    form["kommuner"] = this.kommuner;
    form["lan"] = this.lan;

    if (this.form.value.namn == null // kontrollera att de nödvändigaste fälten är ifyllda
      || this.form.value.beskrivning == null
      || this.form.value.motivering == null) {
      console.log("Skickade inte det nya riksintresset, fyll i namn, beskrivning och motivering!");
    }

    else {
      this.dataService.newRiksintresse(form);
    }
  }
}
