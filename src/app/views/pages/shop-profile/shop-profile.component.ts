// shop-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarModule, BadgeModule, ButtonModule, CardModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, RowComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { Tabs2Module, TableModule } from '@coreui/angular';
import { cilBasket, cilSpeedometer, cilTruck } from '@coreui/icons';
import { RouterLink } from '@angular/router';
import { ModalComponent, ModalModule } from '@coreui/angular';
import { ShopProductComponent } from '../../components/shop-product/shop-product.component';
import { ShopOrderComponent } from '../../components/shop-order/shop-order.component';
import { StockManagmentComponent } from '../../components/stock-managment/stock-managment.component';
import { ShopDashboardComponent } from '../../components/shop-dashboard/shop-dashboard.component';
import { ShopService } from '../../../features/shops/services/shop.service';
import { Shop } from '../../../features/shops/models/shop.model';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shop-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    RowComponent,
    ColComponent,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    IconModule,
    Tabs2Module,
    TableModule,
    RouterLink,
    ModalModule,
    ModalComponent,
    ShopProductComponent,
    ShopOrderComponent,
    StockManagmentComponent,
    ShopDashboardComponent
  ],
  templateUrl: './shop-profile.component.html',
  styleUrl: './shop-profile.component.scss'
})
export class ShopProfileComponent implements OnInit {
  isLoading = false;

  constructor(private shopService: ShopService, private cdr: ChangeDetectorRef) {}

  shopProfile: Shop | null = null;

  ngOnInit(): void {
    this.loadShopProfile();
  }

loadShopProfile() { 
    this.isLoading = true;
    this.shopService.getById('69a0ae5d5413ebd0a41e49f9').subscribe({
      next: (shop) => {
        this.shopProfile = shop;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Profil chargé :', this.shopProfile);
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Erreur de chargement', err);
      }
    });
  }

  cilBasket = cilBasket;
  cilSpeedometer = cilSpeedometer;
  cilTruck = cilTruck;

  handleChange($event: string | number | undefined) {
    console.log('handleChange', $event);
  }

  modifierAbonnement() {
    console.log("Rediriger vers la page de modification d'abonnement");
  }

  enregistrerModifications() {
    console.log("Enregistrer les données du profil de la boutique", this.shopProfile);
    // Ici, vous enverrez les données mises à jour à votre API
  }
}