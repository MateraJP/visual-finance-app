import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionYearComponent } from './option-year.component';

describe('OptionYearComponent', () => {
  let component: OptionYearComponent;
  let fixture: ComponentFixture<OptionYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
