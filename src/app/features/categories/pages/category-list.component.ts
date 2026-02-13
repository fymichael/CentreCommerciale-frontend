import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { 
  CardModule, 
  GridModule, 
  TableModule, 
  AvatarModule, 
  ButtonModule ,
  BadgeModule,
  ModalModule,
  SpinnerModule 
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  
  imports: [
    CardModule, 
    GridModule, 
    TableModule, 
    AvatarModule, 
    IconModule, 
    ButtonModule,
    BadgeModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    SpinnerModule  
  ],
})
export class CategoryListComponent implements OnInit {

    categorys: Category[] = [];
    addModalVisible = false;
    categoryForm!: FormGroup;
    isEditMode = false;
    selectedCategoryId: string | null = null;
    loading = false;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef  
    ) {}

   ngOnInit(): void {
        this.initForm();
        this.loadCategorys();
    }

    initForm(): void {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

   
   loadCategorys(): void {
        this.loading = true;
        this.categoryService.getAll()
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: data => {
                    this.categorys = [...data];
                    this.loading = false;
                    this.cd.detectChanges();
                }
            });
    }

    openAddModal(): void {
        this.isEditMode = false;
        this.selectedCategoryId = null;
        this.categoryForm.reset({
            name: '',
            description: ''
        });
        this.addModalVisible = true;
    }

    openEditModal(category: Category): void {
        this.isEditMode = true;
        this.selectedCategoryId = category._id;

        this.categoryForm.patchValue({
        name: category.name,
        description: category.description
        });

        this.addModalVisible = true;
    }

    closeAddModal(): void {
        this.addModalVisible = false;
    }

    saveCategory(): void {
        if (this.categoryForm.invalid) return;

        const data = this.categoryForm.value;

        if (this.isEditMode && this.selectedCategoryId) {

        this.categoryService.update(this.selectedCategoryId, data)
            .subscribe(() => {
            this.loadCategorys();
            this.closeAddModal();
            });

        } else {
            this.categoryService.create(data)
                .subscribe(() => {
                this.loadCategorys();
                this.closeAddModal();
            });
        }
    }

    deleteCategory(id: string): void {
        if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return;

        this.loading = true;

        this.categoryService.delete(id)
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => {
                this.categorys = this.categorys.filter(c => c._id !== id);
                this.loadCategorys();
            });
    }

    trackById(index: number, item: Category): string {
        return item._id;
    }
}
