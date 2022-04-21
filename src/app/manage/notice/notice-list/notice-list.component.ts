import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { NoticeService } from '../api/notice.service';
import { NoticeViewModueService } from '../vm/notice-view-modue.service';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  pos = 0;
  pageNumber = 1;
  tableCount = 10;
  searchValue = '';
  constructor(
    public vm: NoticeViewModueService,
    public api: NoticeService,
    public router: Router
  ) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.getNotice();
    const token = localStorage.getItem('token');
    if (token === null) {
      alert('plese login');
      this.router.navigate(['/login']);
    }
  }

  getNotice(): void {
    const method = 'listAllNotice';
    this.subs.sink = this.api.notice(method).subscribe(res => {
      if (res.status === '1') {
        this.vm.setNotice(res.data.filter(f => f.status !== '0'));
      }
    }, err => console.log(err),
      () => {
      }
    );
  }

  getImgUrl(url: string): string {
    if (url) {
      return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }


  deleteNotice(id: string) {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າລຶບຂໍ້ແຈ້ງການລະຫັດ' + ' ' + id)) {

      const method = 'deleteNotice';
      this.subs.sink = this.api.deleteNotice(id, method).subscribe(res => {
        if (res.status === '1') {
          this.vm.noticeList = this.vm.noticeList.filter(f => f.notice_id !== id);

        }

      }, err => console.log(err),
        () => {

        }
      );
    }
  }


  tableCountFunc(): any {
    return (this.vm.noticeList) ? this.vm.noticeList.slice(0, this.tableCount) : null;
  }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.vm.noticeList = this.vm.masterNotice.filter(f =>
        f.title.includes(this.searchValue.toLowerCase()) ||
        f.dsc.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.vm.noticeList = this.vm.masterNotice;
    }
  }


  changeTableRow(po: number): void {
    this.tableCount = po;
    this.getData();
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.vm.noticeList);
    if (copyItems.length > 9) {
      dataList = copyItems.splice(this.pos * this.tableCount, this.tableCount);
    } else {
      dataList = copyItems;
    }
    return of(dataList);
  }

  update(o) {
    this.pos = o;
  }

  getCountItems(): number {
    return this.vm.noticeList.length;
  }

}
