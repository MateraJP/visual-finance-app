import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOldInputComponent } from './select-input.component';

describe('SelectOldInputComponent', () => {
  let component: SelectOldInputComponent;
  let fixture: ComponentFixture<SelectOldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOldInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
