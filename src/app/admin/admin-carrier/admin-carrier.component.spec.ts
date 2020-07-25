import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarrierComponent } from './admin-carrier.component';

describe('AdminCarrierComponent', () => {
  let component: AdminCarrierComponent;
  let fixture: ComponentFixture<AdminCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
