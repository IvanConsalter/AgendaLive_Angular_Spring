import { LiveFormDialogComponent } from 'src/app/views/live-form-dialog/live-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LiveService } from './live.service';
import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-live',
  templateUrl: './list-live.component.html',
  styleUrls: ['./list-live.component.scss']
})
export class ListLiveComponent implements OnInit {

  subscriptionReload: Subscription = null;

  livePrevious: Array<Live> = [];
  liveNext: Array<Live> = [];

  constructor(
    private liveService: LiveService,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscriptionReload = this.liveService.behaviorSubjectReload.subscribe(() => {
      this.livePrevious = [];
      this.liveNext = [];
      this.consultarLives();
    });
    this.consultarLives();
  }

  consultarLives() {
    this.liveService.consultarLivesPorFlag('previous')
      .subscribe( resposta => {
        this.livePrevious = resposta.content;
        this.livePrevious.forEach(live => {
          console.log(live.liveLink);

          live.liveLink = live.liveLink.replace("watch?v=", "embed/");
          console.log(live.liveLink);
          live.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
      });

    this.liveService.consultarLivesPorFlag('next')
      .subscribe( resposta => {
        this.liveNext = resposta.content;
        this.liveNext.forEach(live => {
          live.liveLink = live.liveLink.replace("watch?v=", "embed/");
          live.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
      });
  }

  updateLive(liveId: number): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      data: {
        liveId,
        title: 'Editar Live'
      }
    });
  }

  deleteLive(liveId: number): void {
    this.liveService.deleteLive(liveId).subscribe(() => {
      this.consultarLives();
    });
  }

}
