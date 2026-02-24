import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { 
  CardModule, 
  GridModule, 
  TableModule, 
  AvatarModule, 
  ButtonModule ,
  BadgeModule,
  ModalModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CategoryService } from '../../categories/services/category.service';
import { Category } from '../../categories/models/category.model';
import { environment } from '../../../../environments/environment';
import { Shop } from '../../shops/models/shop.model';
import { ShopService } from '../../shops/services/shop.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  
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
    ModalModule
  ],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  addModalVisible = false;
  productForm!: FormGroup;
  loading = false;
  categories: Category[] = [];
  shops: Shop[] = [];
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode = false;
  selectedProductId: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, 
    private shopService: ShopService, 
    private fb: FormBuilder,
    private cd: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadShops();
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      discount_rate: [0, [Validators.min(0), Validators.max(100)]],
      category_id: ['', Validators.required],
      shop_id: [''],
      state: [1],
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: data => {
          this.products = [...data];
            this.loading = false;
            this.cd.detectChanges();
          }
        });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.cd.detectChanges();
      }
    });
  }

   loadShops(): void {
    this.shopService.getAll().subscribe({
      next: (data) => {
        this.shops = data;
        this.cd.detectChanges();
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteProduct(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;

    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== id);
        this.loadProducts();
      }
    });
  }


  openAddModal(): void {
    this.productForm.reset({
      code: '',
      name: '',
      unit_price: 0,
      discount_rate: 0,
      category_id: '',
      shop_id: '',
      state: 1
    });
    this.imagePreview = this.getImageUrl(null);
    this.addModalVisible = true;
  }

  openEditModal(product: Product): void {
    this.isEditMode = true;
    this.selectedProductId = product._id;

    this.productForm.patchValue({
      code: product.code,
      name: product.name,
      unit_price: product.unit_price,
      discount_rate: product.discount_rate,
      category_id: product.category_id?._id,
      shop_id: null,
      state: product.state
    });

    this.imagePreview = this.getImageUrl(product.image || null);
    this.addModalVisible = true;
  }

  closeAddModal(): void {
    this.addModalVisible = false;
  }

  saveProduct() {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    Object.keys(this.productForm.value).forEach(key => {
      const value = this.productForm.value[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.selectedProductId) {
      this.productService.update(this.selectedProductId, formData)
        .subscribe(() => this.afterSave());
    } else {
      this.productService.create(formData)
        .subscribe(() => this.afterSave());
    }
  }

  afterSave(): void {
    this.loadProducts();
    this.closeAddModal();
    this.productForm.reset();
    this.imagePreview = null;
    this.selectedFile = undefined as any;
    this.isEditMode = false;
    this.selectedProductId = null;
  }

  getImageUrl(image: string | null): string {
    if (!image) return 'assets/no-image.png';
    return `${environment.apiUrl}${image}`;
  }

  /*saveProduct(): void {
    if (this.productForm.invalid) return;

    this.productService.create(this.productForm.value).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadProducts();
      }
    });
  }*/

  trackById: TrackByFunction<Product> = (index, item) => {
    return item._id;
  };
}
