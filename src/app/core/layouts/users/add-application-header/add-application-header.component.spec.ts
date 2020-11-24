import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationHeaderComponent } from './add-application-header.component';

describe('AddApplicationHeaderComponent', () => {
  let component: AddApplicationHeaderComponent;
  let fixture: ComponentFixture<AddApplicationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
