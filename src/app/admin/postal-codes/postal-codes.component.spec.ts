import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalCodesComponent } from './postal-codes.component';

describe('PostalCodesComponent', () => {
  let component: PostalCodesComponent;
  let fixture: ComponentFixture<PostalCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostalCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostalCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
