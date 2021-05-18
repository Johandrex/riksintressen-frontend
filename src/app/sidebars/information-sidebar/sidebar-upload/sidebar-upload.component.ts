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

  constructor(public dataService: SharedDataService) { }

  /* När användaren väljer en fil skickas den upp via API och lagras i Node.js */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);

      this.dataService.upload(formData);
    }
  }
}