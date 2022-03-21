import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApplyComponent } from './member-apply.component';

describe('MemberApplyComponent', () => {
  let component: MemberApplyComponent;
  let fixture: ComponentFixture<MemberApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
