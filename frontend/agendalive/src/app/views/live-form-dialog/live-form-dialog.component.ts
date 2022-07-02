import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { LiveService } from './../list-live/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent implements OnInit {

  liveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private liveService: LiveService
  ) { }

  ngOnInit(): void {
    this.configurarLiveForm();
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

  addLive(): void {
    const dateFormated = this.datePipe.transform(this.liveForm.value.liveDate, 'yyyy-MM-dd');
    this.liveForm.value.liveDate = `${dateFormated}T${this.liveForm.value.liveTime}`;
    this.liveService.addLive(this.liveForm.value).subscribe( () => {
      this.dialogRef.close();
      this.liveForm.reset();
      this.liveService.behaviorSubjectReload.next(true);
    });
  }

  cancelDialog(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
