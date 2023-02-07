import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMessageComponent } from './menu-message.component';

describe('MenuMessageComponent', () => {
  let component: MenuMessageComponent;
  let fixture: ComponentFixture<MenuMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
