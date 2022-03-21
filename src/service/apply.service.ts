import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/apply.api.php');
  public token = '';
  
  
  applyListAll(param:any):Observable<any> {
    const header = this.headerBase('applyListAllByPostJob');
    return this.http.post(this.url , param,{headers:header});
  }

  acceptApply(param:any):Observable<any> {
    const header = this.headerBase('acceptApply');
    return this.http.post(this.url , param,{headers:header});
  }

  applyListPage(param:any):Observable<any>  {
    const header = this.headerBase('applyListPage');
    return this.http.post(this.url , param,{headers:header});
  }


  applyListPageByCompanyAndStatus(param:any):Observable<any> {
    const header = this.headerBase('applyListPageByCompanyAndStatus');
    return this.http.post(this.url , param,{headers:header});
  }
  

}
