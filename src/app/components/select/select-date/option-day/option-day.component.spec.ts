import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDayComponent } from './option-day.component';

describe('OptionDayComponent', () => {
  let component: OptionDayComponent;
  let fixture: ComponentFixture<OptionDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
