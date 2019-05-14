import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClaimComponent } from './form-claim.component';

describe('FormClaimComponent', () => {
  let component: FormClaimComponent;
  let fixture: ComponentFixture<FormClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
