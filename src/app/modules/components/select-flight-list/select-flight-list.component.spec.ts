import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFlightListComponent } from './select-flight-list.component';

describe('SelectFlightListComponent', () => {
  let component: SelectFlightListComponent;
  let fixture: ComponentFixture<SelectFlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFlightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
