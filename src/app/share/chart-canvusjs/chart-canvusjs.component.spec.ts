import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCanvusjsComponent } from './chart-canvusjs.component';

describe('ChartCanvusjsComponent', () => {
  let component: ChartCanvusjsComponent;
  let fixture: ComponentFixture<ChartCanvusjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCanvusjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCanvusjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
