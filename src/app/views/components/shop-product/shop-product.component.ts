import { ColComponent, FormControlDirective, FormDirective, FormLabelDirective} from '@coreui/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../features/products/models/product.model';
import { ProductService } from '../../../features/products/services/product.service';
import { 
  CardModule, 
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
import { CategoryService } from '../../../features/categories/services/category.service';
import { Category } from '../../../features/categories/models/category.model';
import { environment } from '../../../../environments/environment';
import { Shop } from '../../../features/shops/models/shop.model';
import { ShopService } from '../../../features/shops/services/shop.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-shop-product',
  imports: [CommonModule, ModalModule, ReactiveFormsModule, IconModule, TableModule, AvatarModule, BadgeModule, ButtonModule, CardModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.scss',
})
export class ShopProductComponent {
  products: Product[] = [];
  addModalVisible = false;
  productForm!: FormGroup;
  loading = false;
  categories: Category[] = [];
  shop: Shop | null = null;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode = false;
  selectedProductId: string | null = null;
  isLoading = false;
  selectedColors: string[] = [];
  currentShopId: string = localStorage.getItem('currentShopId') || '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, 
    private shopService: ShopService, 
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService  
  ) {}

  categoryConfigs: any = {
    '6996124cbaa4dd1a9f78da90': { storage: 'Capacité de stockage RAM/ROM (ex: 6/256Gb-8/512Gb)' },
    '6996124cbaa4dd1a9f78da91': { storage: 'Tailles disponibles (ex: S-M-L-XL)' },
    '699dfaa493e4c2b2087e532f': { storage: 'Formats disponibles (ex: 15*15-30*30)' },
    '699dfc06541deae87c6fa3b0': { storage: 'Dimensions disponibles (ex: 150*150-300*300)' }
  };

  currentConfig: any = null;

ngOnInit(): void {
  const shopId = this.currentShopId; 
  
  this.isLoading = true;
  this.loadProductsByIdShop(shopId);
  this.loadCategories();
  this.loadShopById();
  this.initForm();

  this.productForm.get('category_id')?.valueChanges.subscribe(categoryId => {
    this.currentConfig = this.categoryConfigs[categoryId] || null;
  });
  this.isLoading = false;
}

addColor(color: string) {
  if (!this.selectedColors.includes(color)) {
    this.selectedColors.push(color);
  }
}

  initForm(): void {
  this.productForm = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    unit_price: [0, [Validators.required, Validators.min(0)]],
    discount_rate: [0, [Validators.min(0), Validators.max(100)]],
    category_id: ['', Validators.required],
    shop_id: this.currentShopId,
    variant: ['', Validators.required],
    build_material: ['', Validators.required],
    quality: ['Authentique', Validators.required],
    state: 1,
  });
}

saveProduct() {
  if (this.productForm.invalid) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  this.loading = true;
  const formData = new FormData();
  const formValues = this.productForm.value;

  Object.keys(formValues).forEach(key => {
    const value = formValues[key];

    if (key === 'colors' || key === 'image') return;

    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  formData.append('color', this.selectedColors.join('-'));
  formData.append('shop_id', this.currentShopId);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  const request = this.isEditMode && this.selectedProductId
    ? this.productService.update(this.selectedProductId, formData)
    : this.productService.create(formData);

  request.pipe(finalize(() => this.loading = false)).subscribe({
    next: () => this.afterSave(),
    error: (err) => {
      console.error('Erreur API:', err);
      alert("Erreur lors de l'enregistrement");
    }
  });
}

loadProductsByIdShop(shopId: string): void {
  this.loading = true;
  
  // Utilisation de ta fonction du service avec l'ID
  this.productService.getByShopId(shopId)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (data) => {
        this.products = [...data];
        this.cd.detectChanges();
      },
      error: (err) => {
        this.products = [];
        console.error('Erreur chargement produits boutique:', err);
        this.products = []; // Vide la liste en cas d'erreur
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

  openAddModal(): void {
    this.isEditMode = false;
    this.productForm.reset({ unit_price: 0, discount_rate: 0, quality: 'Authentique' });
    this.selectedColors = [];
    this.imagePreview = null;
    this.addModalVisible = true; // Déclenche l'affichage
  }

  openEditModal(product: Product): void {
    this.isEditMode = true;
    this.selectedProductId = product._id;
    this.productForm.patchValue(product); // Remplit le formulaire
    this.selectedColors = product.colors || [];
    this.imagePreview = this.getImageUrl(product.image);
    this.addModalVisible = true;
  }

  closeAddModal(): void {
    this.addModalVisible = false;
  }

   loadShopById(): void {
    this.shopService.getById(this.currentShopId).subscribe({
      next: (data) => {
        this.shop = data;
        this.cd.detectChanges();
      }
    });
  }

removeColor(i: number) {
  this.selectedColors.splice(i, 1);
  
  if (this.productForm.get('color')) {
    this.productForm.patchValue({
      color: this.selectedColors.join('-')
    });
  }

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
        this.loadProductsByIdShop(this.currentShopId); // Reload products for the same shop
      }
    });
  }

  afterSave(): void {
    this.loadProductsByIdShop(this.currentShopId);
    this.closeAddModal();
    this.productForm.reset();
    this.imagePreview = null;
    this.selectedFile = undefined as any;
    this.isEditMode = false;
    this.selectedProductId = null;
    //window.location.reload();
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
