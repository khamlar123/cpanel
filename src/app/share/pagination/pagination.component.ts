import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() itemCount = 0;
  @Input() pageCount = 0;
  @Input() pos = 0;
  @Output() posChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPosChange(target: any): void {
    this.pos = Number(target.value) - 1;
    if (this.pos + 1 > this.totalPage()) {
      this.pos = this.totalPage() - 1;
      target.value = this.totalPage();
    }
    if (this.pos < 0) {
      this.pos = 0;
      target.value = 1;
    }
    this.posChange.next(this.pos);
    target.select();
  }

  nextFunc(index): void {
    this.pos += index;
    if (this.pos + 1 > this.totalPage()) {
      this.pos = this.totalPage() - 1;
      return;
    }
    if (this.pos < 0) {
      this.pos = 0;
      return;
    }
    this.posChange.next(this.pos);
  }

  autoSelect = (target: any) => target.select();

  totalPage(): number {
    return Math.ceil(this.itemCount / this.pageCount);
  }

}
