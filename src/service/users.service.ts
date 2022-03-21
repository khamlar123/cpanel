import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/admin.api.php');
  public token = '';
  
  
  Users_list(param:any):Observable<any> {
    const header = this.headerBase('adminListPage');
    return this.http.post(this.url, param,{headers:header});
  }

  Users_list_all(param:any):Observable<any> {
    const header = this.headerBase('adminListAll');
    return this.http.post(this.url, param,{headers:header});
  }

  Users_add(param:any):Observable<any> {
    const header = this.headerBase('addAdmin');
    return this.http.post(this.url , param,{headers:header});
  }

  Users_edit(param:any):Observable<any> {
    const header = this.headerBase('updateAdmin');
    return this.http.post(this.url , param,{headers:header});
  }

  Users_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteAdmin');
    return this.http.post(this.url , param,{headers:header});
  }

  Users_ChangePassword(param:any):Observable<any> {
    const header = this.headerBase('changePassword');
    return this.http.post(this.url , param,{headers:header});
  }

  Users_get(param:any):Observable<any> {
    const header = this.headerBase('getAdmin');
    return this.http.post(this.url , param,{headers:header});
  }
}
