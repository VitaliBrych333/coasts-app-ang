import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoastsListComponent } from './coasts-list.component';

describe('CoastsListComponent', () => {
  let component: CoastsListComponent;
  let fixture: ComponentFixture<CoastsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoastsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoastsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
