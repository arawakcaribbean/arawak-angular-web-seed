import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAtraccionComponent } from './section-atraccion.component';

describe('SectionAtraccionComponent', () => {
  let component: SectionAtraccionComponent;
  let fixture: ComponentFixture<SectionAtraccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAtraccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
