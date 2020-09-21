import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHydrantPermitComponent } from './add-hydrant-permit.component';

describe('AddHydrantPermitComponent', () => {
  let component: AddHydrantPermitComponent;
  let fixture: ComponentFixture<AddHydrantPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHydrantPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHydrantPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
