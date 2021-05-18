import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';


@Component({
  selector: 'app-sidebar-upload',
  templateUrl: './sidebar-upload.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarUploadComponent implements OnInit {

  ngOnInit(): void { }

  fileName = '';

  constructor(public dataService: SharedDataService) {
    // console.log(this.dataService.nationalInterestByIdFiles);
  }

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
}