import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* formulär */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';

/* våra sidebars komponenter */
import { InformationSidebarComponent } from './information-sidebar/information-sidebar.component';
import { SidebarEditRiksintresseComponent } from './information-sidebar/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarInfoRiksintresseComponent } from './information-sidebar/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { SidebarNewRiksintresseComponent } from './information-sidebar/sidebar-new-riksintresse/sidebar-new-riksintresse.component';
import { SidebarHelpComponent } from './information-sidebar/sidebar-help/sidebar-help.component';
import { ListSidebarComponent } from './list-sidebar/list-sidebar.component';
import { SidebarUploadComponent } from './information-sidebar/sidebar-upload/sidebar-upload.component';

@NgModule({
  declarations: [
    InformationSidebarComponent,
    SidebarEditRiksintresseComponent,
    SidebarInfoRiksintresseComponent,
    SidebarNewRiksintresseComponent,
    SidebarHelpComponent,
    ListSidebarComponent,
    SidebarUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    MatCheckboxModule,
    NgSelectModule
  ],
  exports: [
    InformationSidebarComponent,
    SidebarEditRiksintresseComponent,
    SidebarInfoRiksintresseComponent,
    SidebarNewRiksintresseComponent,
    SidebarHelpComponent,
    ListSidebarComponent,
  ],
})
export class SidebarsModule { }
