import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAccommodationShowComponent } from './place-accommodation-show.component';

describe('PlaceAccommodationShowComponent', () => {
  let component: PlaceAccommodationShowComponent;
  let fixture: ComponentFixture<PlaceAccommodationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAccommodationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAccommodationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
