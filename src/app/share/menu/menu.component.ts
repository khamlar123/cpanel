import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MainService } from 'src/service/main.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  toggled_sidebar:boolean = true
  Permistion:string;
  constructor(@Inject(DOCUMENT) private document: Document, private service: MainService) { }

  ngOnInit(): void {
    this.Permistion = localStorage.getItem('Permistion');
  }

  toggled(){

    if(this.toggled_sidebar){
      this.document.body.classList.add('sidebar-toggled');
      this.document.getElementById('accordionSidebar').classList.add('toggled');
      this.toggled_sidebar = false
    }else{
      this.document.body.classList.remove('sidebar-toggled');
      this.document.getElementById('accordionSidebar').classList.remove('toggled');
      this.toggled_sidebar = true
    }

  }

  checkWeb(): boolean{
    return (this.service.getEnpoin() === 'http://psldoic.gov.la/website')?  true : (this.service.getEnpoin() === 'http://odxdoic.gov.la/oudomxay')? false: false;
  }

}
