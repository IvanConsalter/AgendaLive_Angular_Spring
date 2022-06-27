import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { ListLiveComponent } from './list-live/list-live.component';
import { LiveFormDialogComponent } from './live-form-dialog/live-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ListLiveComponent,
    HomeComponent,
    LiveFormDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatTabsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ListLiveComponent,
    HomeComponent
  ]
})
export class ViewsModule { }
