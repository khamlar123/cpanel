import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ProductTeaUrl = this.service.getEnpoin() + '/api/productTea.api.php';
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

  loadProductTea(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.ProductTeaUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteProductTea(id: string, method: string): Observable<any> {
    const pram = {
      teaId: id
    };
    return this.http.post(this.ProductTeaUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateProductTea(modal, method: string): Observable<any> {
    return this.http.post(this.ProductTeaUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addProductTea(modal, method: string): Observable<any> {
    return this.http.post(this.ProductTeaUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetailProductTea(id, method: string): Observable<any> {
    const pram = {
      teaId: id
    };
    return this.http.post(this.ProductTeaUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
