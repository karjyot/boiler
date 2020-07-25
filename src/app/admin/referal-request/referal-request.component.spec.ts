import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalRequestComponent } from './referal-request.component';

describe('ReferalRequestComponent', () => {
  let component: ReferalRequestComponent;
  let fixture: ComponentFixture<ReferalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
