import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.router.navigate(['./Login']);
      return false;
    }

    return true;
  }

}
