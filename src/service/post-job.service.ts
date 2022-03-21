import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostJobService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/postJob.api.php');
  public token = '';
  
  
  PostJob_list(param:any):Observable<any> {
    const header = this.headerBase('postJobListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  PostJob_list_all():Observable<any> {
    const header = this.headerBase('postJobListAll');
    return this.http.post(this.url , {},{headers:header});
  }

  PostJob_list_by_company(param:any):Observable<any> {

    const header = this.headerBase('postJobListPageByCompany');
    return this.http.post(this.url , param,{headers:header});
  }

  PostJob_add(param:any):Observable<any> {
    const header = this.headerBase('addPostJob');
    return this.http.post(this.url , param,{headers:header});
  }

  PostJob_edit(param:any):Observable<any> {
    const header = this.headerBase('updatePostJob');
    return this.http.post(this.url, param,{headers:header});
  }

  PostJob_remove(param:any):Observable<any> {
    const header = this.headerBase('deletePostJob');
    return this.http.post(this.url, param,{headers:header});
  }

  PostJob_get(param:any):Observable<any> {
    const header = this.headerBase('getPostJob');
    return this.http.post(this.url, param,{headers:header}); 
  }
  
 

  

}
