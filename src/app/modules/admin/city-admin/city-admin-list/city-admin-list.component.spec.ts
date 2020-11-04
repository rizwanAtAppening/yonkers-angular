import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAdminListComponent } from './city-admin-list.component';

describe('CityAdminListComponent', () => {
  let component: CityAdminListComponent;
  let fixture: ComponentFixture<CityAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
