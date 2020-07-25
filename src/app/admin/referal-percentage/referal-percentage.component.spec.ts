import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalPercentageComponent } from './referal-percentage.component';

describe('ReferalPercentageComponent', () => {
  let component: ReferalPercentageComponent;
  let fixture: ComponentFixture<ReferalPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferalPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferalPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
