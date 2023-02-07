import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileQuickNavComponent } from './mobile-quick-nav.component';

describe('MobileQuickNavComponent', () => {
  let component: MobileQuickNavComponent;
  let fixture: ComponentFixture<MobileQuickNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileQuickNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileQuickNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
