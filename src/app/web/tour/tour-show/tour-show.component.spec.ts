import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourShowComponent } from './tour-show.component';

describe('TourShowComponent', () => {
  let component: TourShowComponent;
  let fixture: ComponentFixture<TourShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
