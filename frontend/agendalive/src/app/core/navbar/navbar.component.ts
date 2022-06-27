import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { LiveFormDialogComponent } from 'src/app/views/live-form-dialog/live-form-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addLive(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
