import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/salaryRate.api.php');
  public token = '';
  
  
  Salary_list(param:any):Observable<any> {
    const header = this.headerBase('salaryRateListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Salary_list_all():Observable<any> {
    const header = this.headerBase('salaryRateListAll');
    return this.http.post(this.url , {},{headers:header});
  }

  Salary_add(param:any):Observable<any> {
    const header = this.headerBase('addSalaryRate');
    return this.http.post(this.url , param,{headers:header});
  }

  Salary_edit(param:any):Observable<any> {
    const header = this.headerBase('updateSalaryRate');
    return this.http.post(this.url , param,{headers:header});
  }

  Salary_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteSalaryRate ');
    return this.http.post(this.url, param,{headers:header});
  }

  Salary_get(param:any):Observable<any> {
    const header = this.headerBase('getSalaryRate ');
    return this.http.post(this.url, param,{headers:header});
  }
}
