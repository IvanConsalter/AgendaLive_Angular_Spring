import { LiveService } from './live.service';
import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';

@Component({
  selector: 'app-list-live',
  templateUrl: './list-live.component.html',
  styleUrls: ['./list-live.component.scss']
})
export class ListLiveComponent implements OnInit {

  livePrevious: Array<Live> = [];
  liveNext: Array<Live> = [];

  constructor(
    private liveService: LiveService
  ) { }

  ngOnInit(): void {
    this.consultarLives();
  }

  consultarLives() {
    this.liveService.consultarLivesPorFlag('previous')
      .subscribe( resposta => {
        this.livePrevious = resposta.content;
        console.log(this.livePrevious);

      });

    this.liveService.consultarLivesPorFlag('next')
      .subscribe( resposta => {
        this.liveNext = resposta.content;
        console.log(this.liveNext);

      });
  }

}
