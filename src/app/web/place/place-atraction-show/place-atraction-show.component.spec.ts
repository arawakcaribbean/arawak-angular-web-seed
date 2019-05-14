import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAtractionShowComponent } from './place-atraction-show.component';

describe('PlaceAtractionShowComponent', () => {
  let component: PlaceAtractionShowComponent;
  let fixture: ComponentFixture<PlaceAtractionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAtractionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAtractionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
