/* viktiga angular moduler */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/* formulär */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

/* våra moduler / komponenter */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MapComponent } from './map/map.component';

/* sidebars */
import { InformationSidebarComponent } from './sidebars/information-sidebar/information-sidebar.component';
import { SidebarEditRiksintresseComponent } from './sidebars/information-sidebar/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarHelpComponent } from './sidebars/information-sidebar/sidebar-help/sidebar-help.component';
import { SidebarInfoRiksintresseComponent } from './sidebars/information-sidebar/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { ListSidebarComponent } from './sidebars/list-sidebar/list-sidebar.component';
import { SidebarMenuComponent } from './sidebars/information-sidebar/sidebar-menu/sidebar-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListSidebarComponent,
    NavigationBarComponent,
    InformationSidebarComponent,
    SidebarEditRiksintresseComponent,
    SidebarInfoRiksintresseComponent,
    SidebarHelpComponent,
    MapComponent,
    SidebarMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatRadioModule,
    MatCheckboxModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
