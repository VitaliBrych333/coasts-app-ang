import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoastComponent } from './edit-coast.component';

describe('EditCoastComponent', () => {
  let component: EditCoastComponent;
  let fixture: ComponentFixture<EditCoastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
