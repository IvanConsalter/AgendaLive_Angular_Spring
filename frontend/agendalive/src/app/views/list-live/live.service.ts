import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Live } from 'src/app/shared/model/live.model';
import { ResponsePageable } from 'src/app/shared/model/response-pageable.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

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

  public addLive(live: any): Observable<Live> {
    return this.http.post<any>(this.liveUrl, live, this.httpOptions);
  }

  public deleteLive(liveId: number): Observable<Live> {
    return this.http.delete<Live>(`${this.liveUrl}/${liveId}`);
  }
}
