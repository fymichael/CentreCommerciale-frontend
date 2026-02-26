import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module'; 
import { LoginComponent } from './pages/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,     
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule {}
