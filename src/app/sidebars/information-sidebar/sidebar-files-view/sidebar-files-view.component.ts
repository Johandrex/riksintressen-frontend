import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/services/shared-data.service';


@Component({
  selector: 'app-files-view',
  templateUrl: './sidebar-files-view.component.html',
  styleUrls: ['../../sidebar-form.scss']
})
export class SidebarFilesViewComponent implements OnInit {

  public getStaticURL = this.dataService.getStaticAPI(); // url till API

  constructor(public dataService: SharedDataService) { }

  ngOnInit(): void { }

  /* Avbryter, går tillbaks till redigeringen */
  buttonCancel() {
    this.dataService.infoSidebarMode = this.dataService.MODE.INFO;
  }
}