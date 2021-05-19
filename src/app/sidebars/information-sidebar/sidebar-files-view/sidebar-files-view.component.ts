import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';


@Component({
  selector: 'app-files-view',
  templateUrl: './sidebar-files-view.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarFilesViewComponent implements OnInit {

  ngOnInit(): void { }

  fileName = '';

  public getAPI = this.dataService.getAPI().replace("api/", ""); // url till API

  constructor(public dataService: SharedDataService) { }

  /* När användaren väljer en fil skickas den upp via API och lagras i Node.js */
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", this.dataService.nationalInterestById.id.toString()); // skicka med ID

      await this.dataService.upload(formData); // async, vänta tills filen har laddats upp
    }
  }

  /* Avbryter, går tillbaks till redigeringen */
  buttonCancel() {
    this.dataService.infoSidebarMode = this.dataService.MODE.INFO;
  }
}