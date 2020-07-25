import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdsComponent } from './admin-ads.component';

describe('AdminAdsComponent', () => {
  let component: AdminAdsComponent;
  let fixture: ComponentFixture<AdminAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
