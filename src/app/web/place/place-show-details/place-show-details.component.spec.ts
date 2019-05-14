import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceShowDetailsComponent } from './place-show-details.component';

describe('PlaceShowDetailsComponent', () => {
  let component: PlaceShowDetailsComponent;
  let fixture: ComponentFixture<PlaceShowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceShowDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
