import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends APIService {

  public params: any = {};
  private url: string = this.getBaseUrl('/login.api.php');
  public token = '';

  
  login(param):Observable<any> {

      return this.http.post(this.url, param);

  }

  login_company(param):Observable<any> {

    return this.http.post(this.getBaseUrl('/loginCompany.api.php'), param);

}

  register(param):Observable<any> {

    return this.http.post(this.url, param);

  }

  forget(param):Observable<any> {

    return this.http.post(this.url, param);

  }


}
