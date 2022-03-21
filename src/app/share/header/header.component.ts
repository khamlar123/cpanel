import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  permistion:string;
  toggled_sidebar:boolean = true;
  username:string;
  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) { }

  ngOnInit(): void {
    this.permistion = localStorage.getItem('Permistion');
    this.username = localStorage.getItem('User')
  }

  sidebarToggleTop(){    

    if(this.toggled_sidebar){
      
      this.document.body.classList.remove('sidebar-toggled');
      this.document.getElementById('accordionSidebar').classList.remove('toggled');
      this.toggled_sidebar = false
    }else{
      
      this.document.body.classList.add('sidebar-toggled');
      this.document.getElementById('accordionSidebar').classList.add('toggled');
     
      this.toggled_sidebar = true
    }

  }


  logout(): void{
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}