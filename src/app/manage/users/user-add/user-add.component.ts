import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from "src/service/users.service";
import Swal from 'sweetalert2';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public name:string = "";
  public lastname:string ="";
  public username:string ="";
  public password:string = "";
  public address:string = "";
  public phonenumber:string ="";
  public email:string ="";

  constructor(private UsersService:UsersService,private spiner:NgxSpinnerService,private Location:Location) { }

  ngOnInit(): void {
  
  }


  keyname(event: KeyboardEvent) {
    this.name = (event.target as HTMLInputElement).value;

  }

  keylastname(event: KeyboardEvent) {
    this.lastname = (event.target as HTMLInputElement).value;

  }

  keyusername(event: KeyboardEvent) {
    this.username = (event.target as HTMLInputElement).value;

  }

  keyaddress(event: KeyboardEvent) {
    this.address = (event.target as HTMLInputElement).value;

  }

  keyphonenumber(event: KeyboardEvent) {
    this.phonenumber = (event.target as HTMLInputElement).value;

  }

  keyemail(event: KeyboardEvent) {
    this.email = (event.target as HTMLInputElement).value;

  }

  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;

  }

  save(){
    
    
    
    if(this.name == "" || this.lastname == "" || this.email == "" || this.username == "" || this.password == "" || this.phonenumber == "" || this.address == ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      return
    }

    const prame = {
      name:this.name,
      lastname:this.lastname,
      username:this.username,
      password:this.password,
      address:this.address,
      phonenumber:this.phonenumber,
      email:this.email
  
    }

    console.log(prame);
    

    this.spiner.show();

    this.UsersService.Users_add(prame).subscribe(
      res=>{
         console.log(res);
         this.spiner.hide();
         if(res.status == 1){
           this.Location.back();
         }
      },
      err=>{
         console.log('User list ERROR',err);
        this.spiner.hide();
      }
    )
    

  }

}


