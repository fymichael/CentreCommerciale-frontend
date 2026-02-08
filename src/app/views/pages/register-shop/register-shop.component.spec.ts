import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShopComponent } from './register-shop.component';

describe('RegisterShopComponent', () => {
  let component: RegisterShopComponent;
  let fixture: ComponentFixture<RegisterShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterShopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
