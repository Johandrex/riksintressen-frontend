import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderButtonComponent } from './buttons/header-button/header-button.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HeaderButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  exports: [
    HeaderButtonComponent
  ]
})
export class SharedModule { }
