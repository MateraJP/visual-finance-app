import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionMonthComponent } from './option-month.component';

describe('OptionMonthComponent', () => {
  let component: OptionMonthComponent;
  let fixture: ComponentFixture<OptionMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
