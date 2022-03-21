import { Component, OnInit } from '@angular/core';
import { pageingtation } from "src/pageingtation/pageingtation";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from "src/service/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private page:number=1;
  public remit:number=10;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';

  constructor(
    private UsersService:UsersService,
    private spiner:NgxSpinnerService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {
      this.load_list()
    }
  

    load_list(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword
      }
  
      this.spiner.show();
  
      this.UsersService.Users_list(prame).subscribe(
        res=>{
          
          this.data_list = res.data;
          console.log(this.data_list);
          this.pageingtations = this.pageingtation.pageingtations(res.data.Page,res.data.Pagetotal);
          this.spiner.hide();
        },
        err=>{
           console.log('User list ERROR',err);
          this.spiner.hide();
        }
      )
  
    }
  
    click_page(page:any){
  
      if(page){
        this.page = page;
        this.load_list();
  
      }
  
    }
  
    searchItems(event: KeyboardEvent) {
      // console.log( this.keyword);
      
      this.keyword = (event.target as HTMLInputElement).value;
      
      this.load_list();
    }
  
    change_remit(){
      this.load_list();
  
    }
  
  }
  