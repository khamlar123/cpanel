import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/company.api.php');
  public token = '';


  image_logo():string{
    return this.getimage();
  }
  
  
  company_list(param:any):Observable<any> {
    const header = this.headerBase('companyListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  company_list_all(param:any):Observable<any> {
    const header = this.headerBase('companyListAll');
    return this.http.post(this.url , param,{headers:header});
  }
  

  company_add(param:any):Observable<any> {
    const header = this.headerBase('addCompany');
    return this.http.post(this.url , param,{headers:header});
  }

  company_edit(param:any):Observable<any> {
    const header = this.headerBase('updateCompany');
    return this.http.post(this.url, param,{headers:header});
  }

  company_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteCompany');
    return this.http.post(this.url , param,{headers:header});
  }

  company_changePassword(param:any):Observable<any> {
    const header = this.headerBase('changePassword');
    return this.http.post(this.url , param,{headers:header});
  }


  company_DisableAndEnable(param:any):Observable<any> {
    const header = this.headerBase('setDisableAndEnableCompany');
    return this.http.post(this.url , param,{headers:header});
  }

  company_upProveCompany(param:any):Observable<any> {
    const header = this.headerBase('upProveCompany');
    return this.http.post(this.url , param,{headers:header});
  }

 
}
