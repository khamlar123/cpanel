import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApplyNotAceptedComponent } from './member-apply-not-acepted.component';

describe('MemberApplyNotAceptedComponent', () => {
  let component: MemberApplyNotAceptedComponent;
  let fixture: ComponentFixture<MemberApplyNotAceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApplyNotAceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApplyNotAceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
