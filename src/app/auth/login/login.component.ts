import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from "src/service/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';
import { LoginApiService } from './API/login-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subs = new SubSink();
  constructor(@Inject(DOCUMENT) private documents: Document,private authService:AuthService,private SpinnerService:NgxSpinnerService,private router: Router,private api: LoginApiService) { }

  ngOnInit(): void {
    this.documents.body.classList.add('sidebar-toggled');
  }

  public elem = document.documentElement

  fullscreen(){
    if(this.elem.requestFullscreen){
      this.elem.requestFullscreen()
    }
  }


  
  public username: string="";
  public password: string="";

  

  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;

  }
  keyusername(event: KeyboardEvent) {
    this.username = (event.target as HTMLInputElement).value;

  }

  
  




  loginFunc():void{
    if(this.username == ''){
      return alert('plese enter user name');
    }

    if(this.password == ''){
      return alert('plese enter password');
    }

    const lofinModal = {
      username: this.username,
      password: this.password,
    }
 
   this.subs.sink = this.api.login(lofinModal).subscribe(res => {
     if(res.status > 0) {
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('UserName', res.data.row.username)
      this.router.navigate(['/main']);
     }else{
      alert('Invalid user');
     }
  
    }),err => {
      console.log(err);
      this.router.navigate(['/login']);
    },
    () => {}
    
  }

 




}
