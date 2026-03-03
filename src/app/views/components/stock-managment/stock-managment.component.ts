import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  CardModule,
  ButtonModule,
  BadgeModule,
  TableModule,
  ModalModule,
  FormDirective,
  FormControlDirective,
  FormLabelDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { StockService } from '../../../features/storages/services/stock.service';
import { ProductService } from '../../../features/products/services/product.service';
import { ChangeDetectorRef, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-stock-managment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RowComponent,
    ColComponent,
    CardModule,
    ButtonModule,
    BadgeModule,
    TableModule,
    ModalModule,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    IconModule
  ],
  templateUrl: './stock-managment.component.html',
  styleUrls: ['./stock-managment.component.scss'],
})
export class StockManagmentComponent implements OnInit {

  products: any[] = [];
  productsForStock: any[] = [];
  ruptures: number = 0;
  lowStocks: number = 0;
  currentShopId = localStorage.getItem('currentShopId') || '';

  // Champs du modal
  selectedProduct: string = '';
  quantity: number = 0;
  unitCost: number = 0;

  constructor(
    private stockService: StockService,
    private productService: ProductService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef  
  ) {}

  ngOnInit() {
    this.loadStock();
    this.loadProducts();
  }

  // Chargement de l’état des stocks
  loadStock() {
    this.stockService.getStockState().subscribe(data => {
      console.log('État des stocks chargé :', data);
      this.productsForStock = data.filter(p => p.shop_id._id === this.currentShopId);

      this.ruptures = data.filter(p => p.stock_quantity === 0 && p.shop_id._id === this.currentShopId).length;
      this.lowStocks = data.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5 && p.shop_id._id === this.currentShopId).length;
    });
  }

  loadProducts(): void {
    this.productService.getByShopId(this.currentShopId).subscribe({
      next: (data) => {
        console.log('Produits chargés :', data);
        this.products = data;
        this.cd.detectChanges();
      }
    });
  }

  // Ajouter une entrée de stock (CUMP)
  saveEntry(productId: string, quantity: number, unitCost: number) {
    if (!productId || quantity <= 0 || unitCost <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    this.stockService.addEntry({ productId, quantity, unitCost })
      .subscribe({
        next: () => {
          this.loadStock();
          // Reset modal
          this.selectedProduct = '';
          this.quantity = 0;
          this.unitCost = 0;
          this.cd.detectChanges();
        },
        error: (err) => alert(err.error?.message || err.message)
      });
  }

  // Méthode pour déterminer le statut d’un produit
  getStockStatus(stock: number) {
    if (stock === 0) return 'Rupture';
    if (stock <= 5) return 'Stock faible';
    return 'En stock';
  }

  // Couleur du badge
  getStockBadgeColor(stock: number) {
    if (stock === 0) return 'danger';
    if (stock <= 5) return 'warning';
    return 'success';
  }
}