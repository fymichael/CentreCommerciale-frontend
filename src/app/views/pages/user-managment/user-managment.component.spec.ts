import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagmentComponent } from './user-managment.component';

describe('UserManagmentComponent', () => {
  let component: UserManagmentComponent;
  let fixture: ComponentFixture<UserManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
