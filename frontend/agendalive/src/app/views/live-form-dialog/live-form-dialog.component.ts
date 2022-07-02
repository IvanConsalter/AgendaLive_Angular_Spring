import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LiveService } from './../list-live/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent implements OnInit {

  liveForm: FormGroup;
  liveId: number;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private liveService: LiveService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data?.title;
  }

  ngOnInit(): void {
    this.configurarLiveForm();

    if(this.data.liveId !== null) {
      this.getLiveById(this.data.liveId);
    }
  }

  configurarLiveForm(): void {
    this.liveForm = this.formBuilder.group({
      id: [],
      liveName: ['', [Validators.required, Validators.minLength(5)]],
      channelName: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
      liveLink: ['', [Validators.required]]
    });
  }

  saveLive(): void {
    if(!this.liveId) {
      this.addLive();
    }
    else {
      this.updateLive();
    }
  }

  addLive(): void {
    const dateFormated = this.datePipe.transform(this.liveForm.value.liveDate, 'yyyy-MM-dd');
    this.liveForm.value.liveDate = `${dateFormated}T${this.liveForm.value.liveTime}`;
    this.liveService.addLive(this.liveForm.value).subscribe( () => {
      this.dialogRef.close();
      this.liveForm.reset();
      this.liveService.behaviorSubjectReload.next(true);
    });
  }

  updateLive(): void {

  }

  getLiveById(liveId: number): void {
    this.liveService.getLiveById(liveId).subscribe((res) => {

      const time = res.liveDate.slice(11);

      this.liveForm = this.formBuilder.group({
        id: [res.id],
        liveName: [res.liveName, [Validators.required, Validators.minLength(5)]],
        channelName: [res.channelName, [Validators.required]],
        liveDate: [res.liveDate, [Validators.required]],
        liveTime: [time, [Validators.required]],
        liveLink: [res.liveLink, [Validators.required]]
      });
    });
  }

  cancelDialog(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
