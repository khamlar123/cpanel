import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private loginUrl = this.main.getEnpoin() + '/api/login.api.php';
  constructor(
    private main: MainService,
    private http: HttpClient,
    ) { }

    login(modal):Observable<any>{
      return this.http.post(this.loginUrl, modal).pipe(catchError((err) => of('server error')));
    }
}


