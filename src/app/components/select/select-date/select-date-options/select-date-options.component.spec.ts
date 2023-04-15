import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDateOptionsComponent } from './select-date-options.component';

describe('SelectDateOptionsComponent', () => {
  let component: SelectDateOptionsComponent;
  let fixture: ComponentFixture<SelectDateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDateOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
