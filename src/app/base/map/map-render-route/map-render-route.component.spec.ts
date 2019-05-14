import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRenderRouteComponent } from './map-render-route.component';

describe('MapRenderRouteComponent', () => {
  let component: MapRenderRouteComponent;
  let fixture: ComponentFixture<MapRenderRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRenderRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRenderRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
