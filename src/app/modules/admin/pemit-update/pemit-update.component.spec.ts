import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemitUpdateComponent } from './pemit-update.component';

describe('PemitUpdateComponent', () => {
  let component: PemitUpdateComponent;
  let fixture: ComponentFixture<PemitUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemitUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
