import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApplyService} from "src/service/apply.service";
import { PostJobService } from "src/service/post-job.service";
import { pageingtation } from "src/pageingtation/pageingtation";



@Component({
  selector: 'app-member-apply',
  templateUrl: './member-apply.component.html',
  styleUrls: ['./member-apply.component.css']
})
export class MemberApplyComponent implements OnInit {

  
  private page:number=1;
  public remit:number=10;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';

  constructor(
    private ApplyService:ApplyService,
    private spiner:NgxSpinnerService,
    public PostJobService:PostJobService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {

      if(localStorage.getItem('Permistion') == 'company'){
        this.load_list_company();
      }else{
        this.load_list_admin();
      }
     
    }

    
    print()
    {
      window.print();
    }

    load_list_admin(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword
        // company_id: localStorage.getItem('company_id'),
        // status: "acepted"
      }

    console.log('admin');
    
  
      this.spiner.show();
  
      this.ApplyService.applyListPage(prame).subscribe(
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
  

    load_list_company(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword,
        company_id: localStorage.getItem('company_id'),
        status: ""
      }

      console.log('campany');
  
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
        if(localStorage.getItem('Permistion') == 'company'){
          this.load_list_company();
        }else{
          this.load_list_admin();
        }
  
      }
  
    }
  
    searchItems(event: KeyboardEvent) {
      // console.log( this.keyword);
      
      this.keyword = (event.target as HTMLInputElement).value;
      
      if(localStorage.getItem('Permistion') == 'company'){
        this.load_list_company();
      }else{
        this.load_list_admin();
      }
    }
  
    change_remit(){
      if(localStorage.getItem('Permistion') == 'company'){
        this.load_list_company();
      }else{
        this.load_list_admin();
      }
  
    }
  
  }
  

