import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/position.api.php');
  public token = '';
  
  
  Position_list(param:any):Observable<any> {
    const header = this.headerBase('positionListPage');
    return this.http.post(this.url , param,{headers:header});
  }

  Position_list_all():Observable<any> {
    const header = this.headerBase('positionListAll');
    return this.http.post(this.url , {},{headers:header});
  }

  Position_add(param:any):Observable<any> {
    const header = this.headerBase('addPosition');
    return this.http.post(this.url, param,{headers:header});
  }

  Position_edit(param:any):Observable<any> {
    const header = this.headerBase('updatePosition');
    return this.http.post(this.url , param,{headers:header});
  }

  Positions_remove(param:any):Observable<any> {
    const header = this.headerBase('deletePosition');
    return this.http.post(this.url , param,{headers:header});
  }

  Position_Get(param:any):Observable<any> {
    const header = this.headerBase('getPosition');
    return this.http.post(this.url , param,{headers:header});
  }
}
