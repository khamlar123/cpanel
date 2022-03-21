import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/province.api.php');
  public token = '';
  
  
  Provinces_list(param:any):Observable<any> {
    const header = this.headerBase('provinceListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Provinces_list_all():Observable<any> {
    const header = this.headerBase('provinceListAll');
    return this.http.post(this.url ,{},{headers:header});
  }

  Provinces_add(param:any):Observable<any> {
    const header = this.headerBase('addProvince');
    return this.http.post(this.url, param,{headers:header});
  }

  Provinces_edit(param:any):Observable<any> {
    const header = this.headerBase('updateProvince');
    return this.http.post(this.url , param,{headers:header});
  }

  Provinces_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteProvince');
    return this.http.post(this.url , param,{headers:header});
  }

  Provinces_Get(param:any):Observable<any> {
    const header = this.headerBase('getProvince');
    return this.http.post(this.url , param,{headers:header});
  }
}
