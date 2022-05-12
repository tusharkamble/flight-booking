import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPractComponent } from './test-pract.component';

describe('TestPractComponent', () => {
  let component: TestPractComponent;
  let fixture: ComponentFixture<TestPractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
