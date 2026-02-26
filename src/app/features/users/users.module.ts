import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  imports: [
    CommonModule,     
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersManagementModule {}
