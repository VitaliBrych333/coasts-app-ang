import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeFormFieldComponent } from './income-form-field.component';

describe('IncomeFormFieldComponent', () => {
  let component: IncomeFormFieldComponent;
  let fixture: ComponentFixture<IncomeFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
