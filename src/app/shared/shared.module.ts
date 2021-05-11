import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HeaderButtonComponent } from './buttons/header-button/header-button.component';

@NgModule({
  declarations: [
    HeaderButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    HeaderButtonComponent
  ]
})
export class SharedModule { }
