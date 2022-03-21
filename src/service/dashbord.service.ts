import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/dashboard.api.php');
  public token = '';
  
  
  countOfAdmin():Observable<any> {
    const header = this.headerBase('countOfAdmin');
    return this.http.post(this.url , {},{headers:header});
  }

  countOfCompany():Observable<any> {
    const header = this.headerBase('countOfCompany');
    return this.http.post(this.url , {company_id:localStorage.getItem('company_id')},{headers:header});
  }

 

}
