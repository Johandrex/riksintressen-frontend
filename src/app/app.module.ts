import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { InformationSidebarComponent } from './information-sidebar/information-sidebar.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { MapToolbarComponent } from './map-toolbar/map-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    InformationSidebarComponent,
    ListComponent,
    MapComponent,
    MapToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
