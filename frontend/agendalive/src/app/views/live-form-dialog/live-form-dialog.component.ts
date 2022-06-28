import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent implements OnInit {

  liveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private formBuilder: FormBuilder
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

  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
