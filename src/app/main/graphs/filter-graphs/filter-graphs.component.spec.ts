import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGraphsComponent } from './filter-graphs.component';

describe('FilterComponent', () => {
  let component: FilterGraphsComponent;
  let fixture: ComponentFixture<FilterGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
