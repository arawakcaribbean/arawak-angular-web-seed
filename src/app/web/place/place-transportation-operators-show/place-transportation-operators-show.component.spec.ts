import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTransportationOperatorsShowComponent } from './place-transportation-operators-show.component';

describe('PlaceTransportationOperatorsShowComponent', () => {
  let component: PlaceTransportationOperatorsShowComponent;
  let fixture: ComponentFixture<PlaceTransportationOperatorsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTransportationOperatorsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTransportationOperatorsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
