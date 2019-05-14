import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgTableEmpthyComponent } from './msg-table-empthy.component';

describe('AppMsgTableEmpthyComponent', () => {
  let component: MsgTableEmpthyComponent;
  let fixture: ComponentFixture<MsgTableEmpthyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgTableEmpthyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgTableEmpthyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
