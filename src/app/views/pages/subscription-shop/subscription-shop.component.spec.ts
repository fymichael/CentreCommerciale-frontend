import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionShopComponent } from './subscription-shop.component';

describe('SubscriptionShopComponent', () => {
  let component: SubscriptionShopComponent;
  let fixture: ComponentFixture<SubscriptionShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionShopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
