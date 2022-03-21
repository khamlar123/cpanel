import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DegreeService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/degree.api.php');
  public token = '';
  
  
  Degree_list(param:any):Observable<any> {
    const header = this.headerBase('degreeListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Degree_list_all(param:any):Observable<any> {
    const header = this.headerBase('degreeListAll');
    return this.http.post(this.url , param,{headers:header});
  }

  Degrees_add(param:any):Observable<any> {
    const header = this.headerBase('addDegree');
    return this.http.post(this.url , param,{headers:header});
  }

  Degree_edit(param:any):Observable<any> {
    const header = this.headerBase('updateDegree');
    return this.http.post(this.url, param,{headers:header});
  }

  Degree_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteDegree');
    return this.http.post(this.url , param,{headers:header});
  }

  Degree_get(param:any):Observable<any> {
    const header = this.headerBase('getDegree');
    return this.http.post(this.url , param,{headers:header});
  }
}
