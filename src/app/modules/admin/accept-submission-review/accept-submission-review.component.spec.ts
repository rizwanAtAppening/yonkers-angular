import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptSubmissionReviewComponent } from './accept-submission-review.component';

describe('AcceptSubmissionReviewComponent', () => {
  let component: AcceptSubmissionReviewComponent;
  let fixture: ComponentFixture<AcceptSubmissionReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptSubmissionReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptSubmissionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
