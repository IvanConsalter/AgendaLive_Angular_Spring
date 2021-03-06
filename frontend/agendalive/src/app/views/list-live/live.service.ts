import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Live } from 'src/app/shared/model/live.model';
import { ResponsePageable } from 'src/app/shared/model/response-pageable.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  public behaviorSubjectReload: BehaviorSubject<boolean> = new BehaviorSubject(true);

  liveUrl = `${environment.apiUrl}/lives`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public consultarLivesPorFlag(flag: string): Observable<ResponsePageable> {
    let params = new HttpParams();
    params = params.set('flag', flag);
    return this.http.get<ResponsePageable>(this.liveUrl, { params });
  }

  public addLive(live: Live): Observable<Live> {
    return this.http.post<Live>(this.liveUrl, live, this.httpOptions);
  }

  public getLiveById(liveId: number): Observable<Live> {
    return this.http.get<Live>(`${this.liveUrl}/${liveId}`);
  }

  public updateLive(live: Live): Observable<Live> {
    return this.http.put<Live>(`${this.liveUrl}/${live.id}`, live, this.httpOptions);
  }

  public deleteLive(liveId: number): Observable<Live> {
    return this.http.delete<Live>(`${this.liveUrl}/${liveId}`);
  }
}
