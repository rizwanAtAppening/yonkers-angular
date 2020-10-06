import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OversizedVehiclesDetailsComponent } from './oversized-vehicles-details.component';

describe('OversizedVehiclesDetailsComponent', () => {
  let component: OversizedVehiclesDetailsComponent;
  let fixture: ComponentFixture<OversizedVehiclesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OversizedVehiclesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OversizedVehiclesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
