/* viktiga angular moduler */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* våra moduler / komponenter */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { SidebarsModule } from './sidebars/sidebars.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MapComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    SidebarsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
