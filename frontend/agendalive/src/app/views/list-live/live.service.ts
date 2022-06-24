import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponsePageable } from 'src/app/shared/model/response-pageable.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  liveUrl = `${environment.apiUrl}/lives`;

  constructor(
    private http: HttpClient
  ) { }

  public consultarLivesPorFlag(flag: string): Observable<ResponsePageable> {
    let params = new HttpParams();
    params = params.set('flag', flag);
    return this.http.get<ResponsePageable>(this.liveUrl, { params });
  }
}
