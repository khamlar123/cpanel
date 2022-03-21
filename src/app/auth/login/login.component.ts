import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from "src/service/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private documents: Document,private authService:AuthService,private SpinnerService:NgxSpinnerService,private router: Router) { }

  ngOnInit(): void {
    this.documents.body.classList.add('sidebar-toggled');
  }

  public elem = document.documentElement

  fullscreen(){
    console.log('fullscreen');
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

  
  




  login(){
    
    this.fullscreen();
    
    const login_obj = {
      phonenumber : this.username,
      password : this.password
    };
   
    this.SpinnerService.show();
    console.log('login',login_obj);
    this.authService.login_company(login_obj).subscribe(
      res=>{
        this.SpinnerService.hide();
        console.log('res',res);
        if(res.status == 1){
          localStorage.setItem('token',res.Token);
          localStorage.setItem('User',res.data.companyName);
          localStorage.setItem('company_id',res.data.id);
          localStorage.setItem('Permistion','company');
          this.router.navigate(['/main']);
        }else{
          Swal.fire('Alert', res.message, 'error');
        }

     
       
      },
      err=>{
        console.log('err',err);
        
        this.SpinnerService.hide();
      }
    )
 
 
    
  }

 




}
