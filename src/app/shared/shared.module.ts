import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderButtonComponent } from './buttons/header-button/header-button.component';
import { SidebarInfoRiksintresseComponent } from './sidebars/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { SidebarEditRiksintresseComponent } from './sidebars/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarHelpComponent } from './sidebars/sidebar-help/sidebar-help.component';



@NgModule({
  declarations: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarHelpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarHelpComponent
  ]
})
export class SharedModule { }
