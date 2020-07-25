import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDiaryComponent } from './admin-booking-diary.component';

describe('AdminBookingDiaryComponent', () => {
  let component: AdminBookingDiaryComponent;
  let fixture: ComponentFixture<AdminBookingDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBookingDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
