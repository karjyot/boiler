import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoDiaryComponent } from './admin-video-diary.component';

describe('AdminVideoDiaryComponent', () => {
  let component: AdminVideoDiaryComponent;
  let fixture: ComponentFixture<AdminVideoDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
