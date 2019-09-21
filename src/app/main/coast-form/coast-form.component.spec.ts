import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoastFormComponent } from './coast-form.component';

describe('CoastFormComponent', () => {
  let component: CoastFormComponent;
  let fixture: ComponentFixture<CoastFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoastFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
