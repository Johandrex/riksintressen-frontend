import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderButtonComponent } from './buttons/header-button/header-button.component';
import { SidebarInfoRiksintresseComponent } from './sidebars/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { SidebarEditRiksintresseComponent } from './sidebars/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarHelpComponent } from './sidebars/sidebar-help/sidebar-help.component';
import { SelectComponent } from './material/select/select.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarHelpComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarHelpComponent,
    SelectComponent
  ]
})
export class SharedModule { }
