import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRenderPointComponent } from './map-render-point.component';

describe('MapRenderPointComponent', () => {
  let component: MapRenderPointComponent;
  let fixture: ComponentFixture<MapRenderPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRenderPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRenderPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
