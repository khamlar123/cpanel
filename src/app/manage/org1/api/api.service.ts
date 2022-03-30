import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private StructuresUrl = this.service.getEnpoin() + '/api/structures.api.php';
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

  loadAllStructures(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.StructuresUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteStructures(id: string, method: string): Observable<any> {
    const pram = {
      stId: id
    };
    return this.http.post(this.StructuresUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateStructures(modal, method: string): Observable<any> {
    return this.http.post(this.StructuresUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addStructures(modal, method: string): Observable<any> {
    return this.http.post(this.StructuresUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetailStructures(id, method: string): Observable<any> {
    const pram = {
      stId: id
    };
    return this.http.post(this.StructuresUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
