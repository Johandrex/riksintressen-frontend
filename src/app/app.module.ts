import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { InformationSidebarModule } from './information-sidebar/information-sidebar.module';
import { ListModule } from './list/list.module';
import { MapModule } from './map/map.module';
import { MapToolbarModule } from './map-toolbar/map-toolbar.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomeModule,
    BrowserModule,
    AppRoutingModule,
    NavigationBarModule,
    InformationSidebarModule,
    ListModule,
    MapModule,
    MapToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
