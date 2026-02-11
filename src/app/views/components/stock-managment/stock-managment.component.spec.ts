import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagmentComponent } from './stock-managment.component';

describe('StockManagmentComponent', () => {
  let component: StockManagmentComponent;
  let fixture: ComponentFixture<StockManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockManagmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
