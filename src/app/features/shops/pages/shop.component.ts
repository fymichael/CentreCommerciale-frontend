import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shop } from '../models/shop.model';
import { ShopService } from '../services/shop.service';
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
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  
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
export class ShopComponent implements OnInit {

    shops: Shop[] = [];
    addModalVisible = false;
    shopForm!: FormGroup;
    isEditMode = false;
    selectedShopId: string | null = null;
    loading = false;

    constructor(
        private shopService: ShopService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef  
    ) {}

   ngOnInit(): void {
        this.initForm();
        this.loadShops();
    }

    initForm(): void {
        this.shopForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price_in_month: [0, Validators.required]
        });
    }

   
   loadShops(): void {
        this.loading = true;
        this.shopService.getAll()
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: data => {
                    this.shops = [...data];
                    this.loading = false;
                    this.cd.detectChanges();
                }
            });
    }

    openAddModal(): void {
        this.isEditMode = false;
        this.selectedShopId = null;
        this.shopForm.reset({
            name: '',
            description: '',
            price_in_month: 0
        });
        this.addModalVisible = true;
    }

    openEditModal(shop: Shop): void {
        this.isEditMode = true;
        //this.selectedShopId = shop._id;

        this.shopForm.patchValue({
            name: shop.name,
            description: shop.description,
            price_in_month: shop.price_in_month
        });

        this.addModalVisible = true;
    }

    closeAddModal(): void {
        this.addModalVisible = false;
    }

    saveShop(): void {
        if (this.shopForm.invalid) return;

        const data = this.shopForm.value;

        if (this.isEditMode && this.selectedShopId) {

        this.shopService.update(this.selectedShopId, data)
            .subscribe(() => {
            this.loadShops();
            this.closeAddModal();
            });

        } else {
            this.shopService.create(data)
                .subscribe(() => {
                this.loadShops();
                this.closeAddModal();
            });
        }
    }

    deleteShop(id: string | undefined): void {
        if (!confirm('Voulez-vous vraiment supprimer cette boutique ?')) return;

        this.loading = true;

        this.shopService.delete(id!)
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => {
                this.shops = this.shops.filter(c => c._id !== id);
                this.loadShops();
            });
    }

    trackById(index: number, item: Shop): string {
        return item._id || `${index}`;
    }

    getStateConfig(state: number) {
        switch (state) {
        case 1:
            return { label: 'Disponible', color: 'warning' };
        case 5:
            return { label: 'Abonné', color: 'success' };
        case 0:
            return { label: 'Désactivé', color: 'danger' };
        default:
            return { label: 'Inconnu', color: 'secondary' };
    }
  }
}
