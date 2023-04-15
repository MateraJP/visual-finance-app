import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTimeComponent } from './option-time.component';

describe('OptionTimeComponent', () => {
  let component: OptionTimeComponent;
  let fixture: ComponentFixture<OptionTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
