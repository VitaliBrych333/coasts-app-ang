import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoastFormFieldComponent } from './coast-form-field.component';

describe('CoastFormFieldComponent', () => {
  let component: CoastFormFieldComponent;
  let fixture: ComponentFixture<CoastFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoastFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoastFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
