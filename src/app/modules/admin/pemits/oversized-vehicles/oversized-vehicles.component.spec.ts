import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OversizedVehiclesComponent } from './oversized-vehicles.component';

describe('OversizedVehiclesComponent', () => {
  let component: OversizedVehiclesComponent;
  let fixture: ComponentFixture<OversizedVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OversizedVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OversizedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
