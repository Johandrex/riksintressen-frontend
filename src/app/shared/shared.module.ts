import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderButtonComponent } from './buttons/header-button/header-button.component';
import { SidebarInfoRiksintresseComponent } from './sidebars/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { SidebarEditRiksintresseComponent } from './sidebars/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarInformationComponent } from './sidebars/sidebar-information/sidebar-information.component';



@NgModule({
  declarations: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarInformationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderButtonComponent,
    SidebarInfoRiksintresseComponent,
    SidebarEditRiksintresseComponent,
    SidebarInformationComponent
  ]
})
export class SharedModule { }
