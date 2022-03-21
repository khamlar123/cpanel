import { Component, OnInit } from '@angular/core';
import * as moment from "moment";


@Component({
  selector: 'app-titel',
  templateUrl: './titel.component.html',
  styleUrls: ['./titel.component.scss']
})
export class TitelComponent implements OnInit {

  public timer:string = 'loading';

  constructor() { }

  ngOnInit(): void {
  
    let that  = this
    
    setInterval(function(){
        that.timer = moment().format('dddd DD MMMM YYYY h:mm:ss A');   
      // that.timer = moment().format('LLLL');   
       
      // console.log(this.timer);
    
      
      
     }, 1000);
  }




}
