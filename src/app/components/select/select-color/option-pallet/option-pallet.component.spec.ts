import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPalletComponent } from './option-pallet.component';

describe('OptionPalletComponent', () => {
  let component: OptionPalletComponent;
  let fixture: ComponentFixture<OptionPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionPalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
