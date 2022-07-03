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
  showSpinnerLoading: boolean = false;

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
    this.showSpinnerLoading = true;
    this.liveService.consultarLivesPorFlag('previous')
      .subscribe( resposta => {
        this.livePrevious = resposta.content;
        this.livePrevious.forEach(live => {
          live.liveLink = live.liveLink.replace("watch?v=", "embed/");
          live.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
        this.showSpinnerLoading = false;
      });

    this.liveService.consultarLivesPorFlag('next')
      .subscribe( resposta => {
        this.liveNext = resposta.content;
        this.liveNext.forEach(live => {
          live.liveLink = live.liveLink.replace("watch?v=", "embed/");
          live.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
        this.showSpinnerLoading = false;
      });
  }

  updateLive(liveId: number): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      data: {
        liveId,
        title: 'Editar Live',
        showSpinnerLoading: true
      }
    });
  }

  deleteLive(liveId: number): void {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    this.liveService.deleteLive(liveId).subscribe(() => {
      this.consultarLives();
    });
  }

}
