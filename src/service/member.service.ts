import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/member.api.php');
  public token = '';
  
  
  Member_list(param:any):Observable<any> {
    const header = this.headerBase('memberListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Member_list_all():Observable<any> {
    const header = this.headerBase('memberListAll');
    return this.http.post(this.url , {},{headers:header});
  }

  Member_add(param:any):Observable<any> {
    const header = this.headerBase('addMember');
    return this.http.post(this.url , param,{headers:header});
  }

  Member_edit(param:any):Observable<any> {
    const header = this.headerBase('updateMember');
    return this.http.post(this.url, param,{headers:header});
  }

  Member_remove(param:any):Observable<any> {
    const header = this.headerBase('deleteMember');
    return this.http.post(this.url, param,{headers:header});
  }

  Member_changePassword(param:any):Observable<any> {
    const header = this.headerBase('changePassword');
    return this.http.post(this.url, param,{headers:header}); 
  }
  
  Member_Enable(param:any):Observable<any> {
    const header = this.headerBase('setDisableAndEnableMember');
    return this.http.post(this.url, param,{headers:header}); 
  }

  

}
