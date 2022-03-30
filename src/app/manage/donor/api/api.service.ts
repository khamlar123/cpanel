import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private donorUrl = this.service.getEnpoin() + '/api/donor.api.php';
  constructor(
    private http: HttpClient,
    private service: MainService
  ) { }

  protected header(method: string): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
      .set('token', token + '')
      .set('method', method);
    return headers;
  }

  loadAllDonor(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.donorUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteDonor(id: string, method: string): Observable<any> {
    const pram = {
      donor_id: id
    };
    return this.http.post(this.donorUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateDonor(modal, method: string): Observable<any> {
    return this.http.post(this.donorUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addDonor(modal, method: string): Observable<any> {
    return this.http.post(this.donorUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetailDonor(id, method: string): Observable<any> {
    const pram = {
      donor_id: id
    };
    return this.http.post(this.donorUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
