import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';


@Component({
  selector: 'app-files-upload',
  templateUrl: './sidebar-files-upload.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarFilesUploadComponent implements OnInit {

  public getStaticURL = this.dataService.getStaticAPI(); // url till API
  public fileName = new String; // filnamnen

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }
  /* När användaren väljer en fil skickas den upp via API och lagras i Node.js */
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", this.dataService.riksintresse.id.toString()); // skicka med ID

      await this.dataService.upload(formData); // async, vänta tills filen har laddats upp

      this.dataService.subscribeToRiksintresseFiles(this.dataService.riksintresse.id); // hämta nya filer på nytt
    }
  }

  /* Avbryter, går tillbaks till redigeringen */
  buttonCancel() {
    this.dataService.infoSidebarMode = this.dataService.MODE.EDIT;
  }
}