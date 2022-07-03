import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
