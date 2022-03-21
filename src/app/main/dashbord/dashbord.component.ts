import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DashbordService} from "src/service/dashbord.service";
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  public Permistion:string;
  public chart_data:any = [];
  constructor(private spinner: NgxSpinnerService,private DashbordService:DashbordService) { }

  public count:any;

  ngOnInit(): void {
    this.Permistion = localStorage.getItem('Permistion');
    if(localStorage.getItem('Permistion') == 'company'){
      this.countOfCompany();
    }else{
      this.countOfAdmin();
    }
    
  }

  countOfAdmin(){
    this.spinner.show();
    this.DashbordService.countOfAdmin().subscribe(res=>{
    
      this.count = res.data;
      this.chart_data = [
          { y: this.count.apply , name: "ໃບສະມັກ" },
          { y: this.count.company , name: "ບໍ່ລິສັດ" },
          { y: this.count.member , name: "ສະມາຊີກ"},
          { y: this.count.post , name: "ໂພດວຽກ" }
      ]
      console.log('admin',this.chart_data);
      this.load(this.chart_data);
      this.spinner.hide();
      
    },err=>{
      console.log(err);
      this.spinner.hide();
    });


  }

  countOfCompany(){
    this.spinner.show();
    this.DashbordService.countOfCompany().subscribe(res=>{
      console.log('company',res);
      this.count = res.data;
      this.chart_data = [
        { y: this.count.applyAccept , name: " ນັດສຳພາດ" },
        { y: this.count.applyAll , name: "ໃບສະມັກ" },
        { y: this.count.applyNotAccept , name: "ສະມາຊີກ"},
        { y: this.count.post , name: "ໂພດວຽກ" }
    ]
    console.log('company',this.chart_data);
    this.load(this.chart_data);
      this.spinner.hide();
      
    },err=>{
      console.log(err);
      this.spinner.hide();
    });


  }


  load(data){
    let chart = new CanvasJS.Chart("chart", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: " "
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: data
      }]
    });
      
    chart.render();
  }


}
