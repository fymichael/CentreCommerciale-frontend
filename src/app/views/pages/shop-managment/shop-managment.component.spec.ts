import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopManagmentComponent } from './shop-managment.component';

describe('ShopManagmentComponent', () => {
  let component: ShopManagmentComponent;
  let fixture: ComponentFixture<ShopManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopManagmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
