import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceEventShowComponent } from './place-event-show.component';

describe('PlaceEventShowComponent', () => {
  let component: PlaceEventShowComponent;
  let fixture: ComponentFixture<PlaceEventShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceEventShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceEventShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
