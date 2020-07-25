import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDiaryComponent } from './video-diary.component';

describe('VideoDiaryComponent', () => {
  let component: VideoDiaryComponent;
  let fixture: ComponentFixture<VideoDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
