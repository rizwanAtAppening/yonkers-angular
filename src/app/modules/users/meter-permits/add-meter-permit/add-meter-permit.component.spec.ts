import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterPermitComponent } from './add-meter-permit.component';

describe('AddMeterPermitComponent', () => {
  let component: AddMeterPermitComponent;
  let fixture: ComponentFixture<AddMeterPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeterPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeterPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
