import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './registers.routing.module';

@NgModule({
  imports: [
    CommonModule,     
    ReactiveFormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule {}
