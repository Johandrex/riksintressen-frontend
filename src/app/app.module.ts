import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InformationSidebarComponent } from './sidebars/information-sidebar/information-sidebar.component';
import { SidebarEditRiksintresseComponent } from './sidebars/information-sidebar/sidebar-edit-riksintresse/sidebar-edit-riksintresse.component';
import { SidebarHelpComponent } from './sidebars/information-sidebar/sidebar-help/sidebar-help.component';
import { SidebarInfoRiksintresseComponent } from './sidebars/information-sidebar/sidebar-info-riksintresse/sidebar-info-riksintresse.component';
import { ListSidebarComponent } from './sidebars/list-sidebar/list-sidebar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    ListSidebarComponent,
    NavigationBarComponent,
    InformationSidebarComponent,
    SidebarEditRiksintresseComponent,
    SidebarInfoRiksintresseComponent,
    SidebarHelpComponent,
    MapComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    HttpClientModule ,
    NoopAnimationsModule,
    MatRadioModule,
    MatCheckboxModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
