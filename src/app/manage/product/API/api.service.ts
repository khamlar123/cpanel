import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { catchError } from 'rxjs/operators';
import { IEditPod } from '../interface/i-editPod';
import { IAddPod } from '../interface/i-add-pod';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productUrl = this.main.getEnpoin() + '/api/product.api.php';
  constructor(  
    private http: HttpClient,
    private main: MainService
    ) { }

    protected header(method: string):any{
      const token = localStorage.getItem("token")
      const headers = new HttpHeaders({'content-type': 'application/json'})
      .set('Token', token+'')
      .set('method', method);
      return headers;
    }
  

    getProduct(method:string):Observable<any>{
  
      const pram = {
      }
      return this.http.post(this.productUrl,pram, {headers:this.header(method)})
      .pipe(catchError((err) => of ('server error')))
    }

    getProductDetail(id: string , method: string):Observable<any>{
      const pram = {
        prod_id:id,
  
      }
      return this.http.post(this.productUrl,pram, {headers:this.header(method)})
      .pipe(catchError((err) => of ('server error')))
    }

    deletePRoduct(id: string, method: string):Observable<any>{
      const pram = {
        prod_id:id,
  
      }
      return this.http.post(this.productUrl,pram, {headers:this.header(method)})
      .pipe(catchError((err) => of ('server error')))
    }

    updateProduct(modal:IEditPod, method: string): Observable<any>{
      return this.http.post(this.productUrl,modal, {headers:this.header(method)})
      .pipe(catchError((err) => of ('server error')))
    }

    addProduct(modal: IAddPod, method: string): Observable<any>{
      return this.http.post(this.productUrl,modal, {headers:this.header(method)})
      .pipe(catchError((err) => of ('server error')))
    }

}
