import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApplyAceptedComponent } from './member-apply-acepted.component';

describe('MemberApplyAceptedComponent', () => {
  let component: MemberApplyAceptedComponent;
  let fixture: ComponentFixture<MemberApplyAceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApplyAceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApplyAceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
