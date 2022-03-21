import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/district.api.php');
  public token = '';
  
  
  Districts_list(param:any):Observable<any> {
    const header = this.headerBase('districtListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Districts_list_all():Observable<any> {
    const header = this.headerBase('districtListAll');
    return this.http.post(this.url , {},{headers:header});
  }

  Districts_add(param:any):Observable<any> {
    const header = this.headerBase('addDistrict');
    return this.http.post(this.url , param,{headers:header});
  }

  Districts_edit(param:any):Observable<any> {
    const header = this.headerBase('updateDistrict');
    return this.http.post(this.url, param,{headers:header});
  }

  Districts_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteDistrict');
    return this.http.post(this.url, param,{headers:header});
  }

  Districts_get(param:any):Observable<any> {
    const header = this.headerBase('getDistrict');
    return this.http.post(this.url, param,{headers:header});
  }
}
