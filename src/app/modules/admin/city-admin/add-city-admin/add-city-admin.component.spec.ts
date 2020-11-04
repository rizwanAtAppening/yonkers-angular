import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityAdminComponent } from './add-city-admin.component';

describe('AddCityAdminComponent', () => {
  let component: AddCityAdminComponent;
  let fixture: ComponentFixture<AddCityAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCityAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
