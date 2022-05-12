import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInventoryComponent } from './flight-inventory.component';

describe('FlightInventoryComponent', () => {
  let component: FlightInventoryComponent;
  let fixture: ComponentFixture<FlightInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
