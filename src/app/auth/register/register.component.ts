import { Component, OnInit } from '@angular/core';
import { CompanyService } from "src/service/company.service";
import { DistrictsService } from "src/service/districts.service";
import { ProvincesService } from "src/service/provinces.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public Provinces_list:any;
  public District_list:Array<any>;
  public District_list_by_provin:any;

  public companyName:string = "";
  public address:string = "";
  public district_id:number = 0;
  public Provinces_id:number = 0;
  public companyPhonenumber:string = "";
  public companyEmail:string = "";
  public companyContactInfo:string = "";
  public coordinatorPhonenumber:string = "";
  public password:string = "";
  public image_base64:string = "";

  constructor(private CompanyService:CompanyService,private ProvincesService:ProvincesService,private spiner:NgxSpinnerService,private DistrictsService:DistrictsService,private SpinnerService:NgxSpinnerService,private router: Router) { }

  ngOnInit(): void {
    this.load_Provinces_list();
    this.load_District_list();
  }

  
  load_Provinces_list(){

    
    this.spiner.show();

    this.ProvincesService.Provinces_list_all().subscribe(
      res=>{
         console.log(res);
        this.Provinces_list = res.data;
     
        this.spiner.hide();
      },
      err=>{
         console.log('User list ERROR',err);
        this.spiner.hide();
      }
    )

  }

  load_District_list(){

    
    this.spiner.show();

    this.DistrictsService.Districts_list_all().subscribe(
      res=>{
         console.log(res);
        this.District_list = res.data as Array<any>;
     
        this.spiner.hide();
      },
      err=>{
         console.log('User list ERROR',err);
        this.spiner.hide();
      }
    )

  }

  select_provin(){
    let that = this;
    this.district_id = 0;
    this.District_list_by_provin = this.District_list.filter(function (el) {
      return el.province_id == that.Provinces_id; 

    });

    console.log(this.District_list_by_provin);
    
  }


   

  keycompanyName(event: KeyboardEvent) {
    this.companyName = (event.target as HTMLInputElement).value;

  }
  keyaddress(event: KeyboardEvent) {
    this.address = (event.target as HTMLInputElement).value;

  }
  keycompanyPhonenumber(event: KeyboardEvent) {
    this.companyPhonenumber = (event.target as HTMLInputElement).value;

  }

  keycompanyEmail(event: KeyboardEvent) {
    this.companyEmail = (event.target as HTMLInputElement).value;

  }

  keyContactInfo(event: KeyboardEvent) {
    this.companyContactInfo = (event.target as HTMLInputElement).value;

  }

  keycoordinatorPhonenumber(event: KeyboardEvent) {
    this.coordinatorPhonenumber = (event.target as HTMLInputElement).value;

  }

  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;

  }

  register(){

    const company = {
      companyName:this.companyName,
      address:this.address,
      district_id:this.district_id,
      province_id:this.Provinces_id,
      companyPhonenumber:this.companyPhonenumber,
      companyEmail:this.companyEmail,
      companyContactInfo:this.companyContactInfo,
      coordinatorPhonenumber:this.coordinatorPhonenumber,
      password:this.password,
      image:this.image_base64

  };
  console.log(company);


    if(this.companyName == "" || this.address == "" || this.companyPhonenumber == "" || this.companyEmail == "" || this.companyContactInfo == "" || this.coordinatorPhonenumber == "" || this.image_base64 == "" || this.Provinces_id == 0 || this.district_id == 0 || this.password == ""){
      Swal.fire({
        icon: 'error',
        title: 'ຂໍ້ມູນບໍ່ຄົບ',
        text: 'ກະລຸນາປ້ອມ ຂໍ້ມູນໃຫ້ຄົບ!'
      
      })

      return
    }

    
    
    

    
   
    this.SpinnerService.show();

    this.CompanyService.company_add(company).subscribe(
      res=>{
        this.SpinnerService.hide();
        console.log('res',res);
        if(res.status == 1){

          this.router.navigate(['/auth/login']);
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

 

  set_image(image:any){
    console.log(image);
    this.image_base64 = image.img;
    
  }


}
