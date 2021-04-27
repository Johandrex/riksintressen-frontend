import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { InformationSidebarModule } from './information-sidebar/information-sidebar.module';
import { ListComponent } from './list/list.component';
import { MapModule } from './map/map.module';
import { MapToolbarModule } from './map-toolbar/map-toolbar.module';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    HomeModule,
    BrowserModule,
    AppRoutingModule,
    NavigationBarModule,
    InformationSidebarModule,
    MapModule,
    MapToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
