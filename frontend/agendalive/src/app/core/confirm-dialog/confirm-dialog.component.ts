import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiveService } from './../../views/list-live/live.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  liveId: number;
  title: string;

  constructor(
    private liveService: LiveService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.liveId = data.liveId;
    this.title = data.title;
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.liveService.deleteLive(this.liveId).subscribe(() => {
      this.liveService.behaviorSubjectReload.next(true);
    });
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
