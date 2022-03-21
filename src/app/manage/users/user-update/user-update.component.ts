import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from "src/service/users.service";
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public name:string = "";
  public lastname:string ="";
  public username:string ="";
  public password:string = "";
  public address:string = "";
  public phonenumber:string ="";
  public email:string ="";


  public item:any
  constructor(
    private UsersService:UsersService,
    private spiner:NgxSpinnerService,
    public route: Router,
    public router:ActivatedRoute,
    public Location:Location
    ) { }

  ngOnInit(): void {
    this.load()
  }

  load(){
    this.router
      .queryParams
      .subscribe(params => {
        this.load_item(params['id']);
      });
  }

  load_item(id:number){
  
    const prame = {
      id:id
    }

    this.spiner.show();

    this.UsersService.Users_get(prame).subscribe(
      res=>{
         console.log(res);
         this.item = res.data[0];
         
         this.name = this.item.name
         this.lastname = this.item.lastname
         this.username = this.item.username 
         this.password = this.item.password 
         this.address = this.item.address 
         this.phonenumber = this.item.phonenumber 
         this.email = this.item.email 
       
         this.spiner.hide();
      },
      err=>{
         console.log('User list ERROR',err);
        this.spiner.hide();
      }
    )
    

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
      id: this.item.id,
      name:this.name,
      lastname:this.lastname,
      username:this.username,
      password:this.password,
      address:this.address,
      phonenumber:this.phonenumber,
      email:this.email
  
    }

  
    this.spiner.show();

    this.UsersService.Users_edit(prame).subscribe(
      res=>{
         console.log(res);
         if(res.status == 1){
          this.Location.back()
         }
        
         this.spiner.hide();
      },
      err=>{
         console.log('User list ERROR',err);
        this.spiner.hide();
      }
    )
    

  }

}



