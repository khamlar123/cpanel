import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApplyService} from "src/service/apply.service";
import { pageingtation } from "src/pageingtation/pageingtation";


@Component({
  selector: 'app-member-apply-not-acepted',
  templateUrl: './member-apply-not-acepted.component.html',
  styleUrls: ['./member-apply-not-acepted.component.css']
})
export class MemberApplyNotAceptedComponent implements OnInit {

  
    
  private page:number=1;
  public remit:number=5;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';

  constructor(
    private ApplyService:ApplyService,
    private spiner:NgxSpinnerService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {

      
        this.load_list_company();
     
     
    }

    
    print()
    {
      window.print();
    }


    load_list_company(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword,
        company_id: localStorage.getItem('company_id'),
        status: "apply"
      }

    
  
      this.spiner.show();
  
      this.ApplyService.applyListPageByCompanyAndStatus(prame).subscribe(
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
        this.load_list_company();
  
      }
  
    }
  
    searchItems(event: KeyboardEvent) {
      // console.log( this.keyword);
      
      this.keyword = (event.target as HTMLInputElement).value;
      
      this.load_list_company();
    }
  
    change_remit(){
      this.load_list_company();
  
    }
  
  }
  

