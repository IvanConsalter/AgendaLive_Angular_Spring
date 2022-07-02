import { LiveService } from './live.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-live',
  templateUrl: './list-live.component.html',
  styleUrls: ['./list-live.component.scss']
})
export class ListLiveComponent implements OnInit {

  @ViewChild('actionsContent') actionsContent: ElementRef;

  livePrevious: Array<Live> = [];
  liveNext: Array<Live> = [];

  constructor(
    private liveService: LiveService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
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

  showActions(index: number): void {
    console.log(index);
    console.log(this.actionsContent);
    this.actionsContent.nativeElement.classList = 'show-actions';
  }

}
