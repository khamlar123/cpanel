import { Component, OnInit } from '@angular/core';
import { VmService } from './vm/vm.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
    public vm : VmService
    
  ) { }

  ngOnInit(): void {
  }

}
