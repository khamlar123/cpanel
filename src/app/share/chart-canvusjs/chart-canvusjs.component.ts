import { Component, OnInit,Inject,Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-chart-canvusjs',
  templateUrl: './chart-canvusjs.component.html',
  styleUrls: ['./chart-canvusjs.component.css']
})
export class ChartCanvusjsComponent implements OnInit {
  @Input() data:any;
  constructor(@Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    var i = setInterval(function(){
      // do your thing
      console.log(this.data);
      
  
      // counter++;
      if(this.data) {
          clearInterval(i);
      }
    }, 500);
  }

  load(){
    let chart = new CanvasJS.Chart("chart", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "POST Jobs "
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: this.data
      }]
    });
      
    chart.render();
  }
}
