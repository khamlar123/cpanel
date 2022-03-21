import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodterComponent } from './foodter.component';

describe('FoodterComponent', () => {
  let component: FoodterComponent;
  let fixture: ComponentFixture<FoodterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
