import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.api.loadAllUser('listAllUser').subscribe(res => {
      console.log(res);
    });
  }

}
