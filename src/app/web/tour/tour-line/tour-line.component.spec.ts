import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourLineComponent } from './tour-line.component';

describe('TourLineComponent', () => {
  let component: TourLineComponent;
  let fixture: ComponentFixture<TourLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
