import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from "src/service/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private authService:AuthService,private SpinnerService:NgxSpinnerService,private router: Router) { }

  ngOnInit(): void {
    this.document.body.classList.add('sidebar-toggled');
  }

  // Nueng
  // 1234563
  public username: string="";
  public password: string="";

  

  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;

  }
  keyusername(event: KeyboardEvent) {
    this.username = (event.target as HTMLInputElement).value;

  }

  login(){
    

    
    const login_obj = {
      username : this.username,
      password : this.password
    };
   
    this.SpinnerService.show();

    this.authService.login(login_obj).subscribe(
      res=>{
        this.SpinnerService.hide();
        console.log('res',res);
        if(res.status == 1){
          localStorage.setItem('token',res.Token);
          localStorage.setItem('User',res.data.name);
          localStorage.setItem('Permistion','admin');
         
       
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
