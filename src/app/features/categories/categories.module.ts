import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories.routing.module';
import { CategoryListComponent } from './pages/category-list.component'; 

@NgModule({
  imports: [
    CommonModule,     
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriessModule {}
