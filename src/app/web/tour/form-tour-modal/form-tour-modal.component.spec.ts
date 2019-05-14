import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTourModalComponent } from './form-tour-modal.component';

describe('FormTourModalComponent', () => {
  let component: FormTourModalComponent;
  let fixture: ComponentFixture<FormTourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
