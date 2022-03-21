import { Component, OnInit } from '@angular/core';
import { pageingtation } from "src/pageingtation/pageingtation";
import { NgxSpinnerService } from "ngx-spinner";
import { CompanyService } from "src/service/company.service";

@Component({
  selector: 'app-company-list-dashbord',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  private page:number=1;
  public remit:number=5;
  public data_list:any;
  public pageingtations:any[] = [];
  public keyword:string='';
  public part:string='';

  constructor(
    private CompanyService:CompanyService,
    private spiner:NgxSpinnerService,
    public pageingtation:pageingtation
    ) { }

    ngOnInit(): void {
      this.part = this.CompanyService.image_logo();
      this.load_list()
    }

    print()
    {
      window.print();
    }
    load_image(image){
      return this.part+image;
    }
  

    load_list(){

      const prame = {
        page:this.page,
        limit:this.remit,
        keyword:this.keyword
      }
  
      this.spiner.show();
  
      this.CompanyService.company_list(prame).subscribe(
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

    active(item:any){

      var status:boolean;
      if(item.isActive){
        status = false;
      }else{
        status = true;
      }

      const prame = {
       
          "id":item.id,
          "isActive":status
      }
      console.log(prame);
      
      this.spiner.show();
  
      this.CompanyService.company_DisableAndEnable(prame).subscribe(
        res=>{
           console.log(res);

          this.spiner.hide();
          this.load_list();
        },
        err=>{
           console.log('User list ERROR',err);
          this.spiner.hide();
        }
      )
  
    }


    upprove(item:any){

   
      const prame = {
       
          "id":item.id,
      }
      console.log(prame);
      
      this.spiner.show();
  
      this.CompanyService.company_upProveCompany(prame).subscribe(
        res=>{
           console.log(res);

          this.spiner.hide();
          this.load_list();
        },
        err=>{
           console.log('User list ERROR',err);
          this.spiner.hide();
        }
      )
  
    }
  
  }
  
