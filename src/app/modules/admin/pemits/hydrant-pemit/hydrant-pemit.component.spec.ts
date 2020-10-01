import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrantPemitComponent } from './hydrant-pemit.component';

describe('HydrantPemitComponent', () => {
  let component: HydrantPemitComponent;
  let fixture: ComponentFixture<HydrantPemitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrantPemitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrantPemitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
