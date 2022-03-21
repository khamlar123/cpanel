import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DashbordService} from "src/service/dashbord.service";
import { pageingtation } from "src/pageingtation/pageingtation";
import { PostJobService } from "src/service/post-job.service";

@Component({
  selector: 'app-post-jobs-list',
  templateUrl: './post-jobs-list.component.html',
  styleUrls: ['./post-jobs-list.component.css']
})
export class PostJobsListComponent implements OnInit {

  private page:number=1;
  public remit:number=5;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';
  public Permistion:string='';

  

  constructor(
    private PostJobService:PostJobService,
    private spiner:NgxSpinnerService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {
      this.Permistion = localStorage.getItem('Permistion');
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
  

    load_list_company(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword,
        company_id: localStorage.getItem('company_id')
      }

    
  
      this.spiner.show();
  
      this.PostJobService.PostJob_list_by_company(prame).subscribe(
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

    load_list_admin(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword,
      
      }

    
  
      this.spiner.show();
  
      this.PostJobService.PostJob_list(prame).subscribe(
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
  

