import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BranchesService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/major.api.php');
  public token = '';
  
  
  Branches_list(param:any):Observable<any> {
    const header = this.headerBase('majorListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Branches_list_all(param:any):Observable<any> {
    const header = this.headerBase('majorListAll');
    return this.http.post(this.url , param,{headers:header});
  }

  Branches_add(param:any):Observable<any> {
    const header = this.headerBase('addMajor');
    return this.http.post(this.url , param,{headers:header});
  }

  Branches_edit(param:any):Observable<any> {
    const header = this.headerBase('updateMajor');
    return this.http.post(this.url, param,{headers:header});
  }

  Branches_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteMajor');
    return this.http.post(this.url , param,{headers:header});
  }

  Branches_get(param:any):Observable<any> {
    const header = this.headerBase('getMajor');
    return this.http.post(this.url , param,{headers:header});
  }
}
