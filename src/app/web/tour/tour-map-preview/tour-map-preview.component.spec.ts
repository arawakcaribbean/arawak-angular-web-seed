import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourMapPreviewComponent } from './tour-map-preview.component';

describe('TourMapPreviewComponent', () => {
  let component: TourMapPreviewComponent;
  let fixture: ComponentFixture<TourMapPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourMapPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourMapPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
