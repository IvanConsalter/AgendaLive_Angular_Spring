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
  showSpinnerLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private liveService: LiveService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.showSpinnerLoading = data.showSpinnerLoading;
    this.liveId = data.liveId;
    this.title = data?.title;
  }

  ngOnInit(): void {
    this.configurarLiveForm();

    if(this.liveId !== null) {
      this.getLiveById(this.liveId);
    }
  }

  configurarLiveForm(): void {
    this.liveForm = this.formBuilder.group({
      id: [],
      liveName: ['', [Validators.required, Validators.minLength(5)]],
      channelName: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      registrationDate: ['']
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
    this.showSpinnerLoading = true;
    this.liveForm.value.liveDate = this.formatDateToSave();
    this.liveService.addLive(this.liveForm.value).subscribe( () => {
      this.baseConfigWhenSaveLive();
      this.showSpinnerLoading = false;
    });
  }

  updateLive(): void {
    this.showSpinnerLoading = true;
    this.liveForm.value.liveDate = this.formatDateToSave();
    this.liveForm.value.registrationDate = new Date();
    this.liveService.updateLive(this.liveForm.value).subscribe( () => {
      this.baseConfigWhenSaveLive();
      this.showSpinnerLoading = false;
    });

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

      this.showSpinnerLoading = false;
    });
  }

  cancelDialog(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  baseConfigWhenSaveLive(): void {
    this.dialogRef.close();
    this.liveForm.reset();
    this.liveService.behaviorSubjectReload.next(true);
  }

  formatDateToSave(): string {
    const dateFormated = this.datePipe.transform(this.liveForm.value.liveDate, 'yyyy-MM-dd');
    return `${dateFormated}T${this.liveForm.value.liveTime}`;
  }

}
