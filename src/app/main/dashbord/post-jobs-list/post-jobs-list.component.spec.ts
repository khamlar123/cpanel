import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobsListComponent } from './post-jobs-list.component';

describe('PostJobsListComponent', () => {
  let component: PostJobsListComponent;
  let fixture: ComponentFixture<PostJobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostJobsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
