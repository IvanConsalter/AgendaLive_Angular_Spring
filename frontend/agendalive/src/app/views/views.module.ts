import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ListLiveComponent } from './list-live/list-live.component';


@NgModule({
  declarations: [
    ListLiveComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,

    MatTabsModule
  ],
  exports: [
    ListLiveComponent,
    HomeComponent
  ]
})
export class ViewsModule { }
