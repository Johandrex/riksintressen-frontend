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
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';

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
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
