import { Component, OnInit } from '@angular/core';
import { pageingtation } from "src/pageingtation/pageingtation";
import { NgxSpinnerService } from "ngx-spinner";
import { MemberService } from "src/service/member.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  private page:number=1;
  public remit:number=10;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';

  constructor(
    private MemberService:MemberService,
    private spiner:NgxSpinnerService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {
      this.load_list()
    }

    print()
    {
      window.print();
    }
  

    load_list(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword
      }
  
      this.spiner.show();
  
      this.MemberService.Member_list(prame).subscribe(
        res=>{
           console.log(res);
          this.data_list = res.data;
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
  
