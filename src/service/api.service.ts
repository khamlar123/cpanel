import { Injectable } from '@angular/core';
import { server } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(public http: HttpClient) { }
   
  protected getBaseUrl(path:string): string {

     return server.Api_server_path+path;
  
  }

  protected getimage(): string {

    return server.Api_image_path;
 
 }

  protected headerBase(m:string=""): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    
    .set('Token', token+'')
    .set('Method', m)
    ;
    return headers;
  }

  public send(param:any,path:string,Method:string):Observable<any> {
    const header = this.headerBase(Method);
    return this.http.post(server.Api_image_path + path, param,{headers:header});
  }
}
