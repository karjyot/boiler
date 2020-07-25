import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrivacyComponent } from './admin-privacy.component';

describe('AdminPrivacyComponent', () => {
  let component: AdminPrivacyComponent;
  let fixture: ComponentFixture<AdminPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
