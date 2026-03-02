import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { FormModule } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OffcanvasModule } from '@coreui/angular';
import { FilterField, FilterSidebarComponent } from '../../../views/components/filter-sidebar/filter-sidebar.component';
import { SubscriptionShop, SubscriptionState } from '../models/subscriptionShop.model';
import { SubscriptionShopService } from '../services/subscriptionShop.service';
import { finalize } from 'rxjs';
import { Role } from '../../roles/models/role.model';
import { UserService } from '../../users/services/user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Shop } from '../../shops/models/shop.model';
import { User } from '../../users/models/user.model';
import { ShopService } from '../../shops/services/shop.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription-shop',
  standalone: true,
  imports: [
    CardModule, 
    GridModule, 
    TableModule, 
    AvatarModule, 
    IconModule, 
    ButtonModule,
    BadgeModule,
    ModalModule,
    CommonModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    OffcanvasModule,
    FilterSidebarComponent,
    RouterModule
  ],
  templateUrl: './subscription-shop.component.html'
})
export class SubscriptionShopComponent implements OnInit {
  subscriptionShops: SubscriptionShop[] = [];
  shops: Shop[] = [];
  users: User[] = [];
  loading = false;
  filtersVisible = false;
  subscriptionShopFilterFields: FilterField[] = [
    { name: 'search', label: 'Recherche globale', type: 'text', placeholder: 'Nom boutique, reference, description...' },
    { name: 'shop', label: 'Boutique', type: 'select', options: [] },
    { name: 'user', label: 'Utilisateur', type: 'select', options: [] },
    { name: 'state', label: 'Status', type: 'select', options: [
        { label: 'En attente', value: 1 },
        { label: 'Validé', value: 5 },
        { label: 'Refusé', value: 0 },
        { label: 'Desactivé', value: -1 }
      ]
    },
    { name: 'createdFrom', label: 'Créé du', type: 'date' },
    { name: 'createdTo', label: 'Créé au', type: 'date' }
  ];
  addModalVisible = false;
  isEditMode = false;
  selectedSubscriptionId: string | null = null;
  subscriptionShopForm!: FormGroup;
  errorMessage = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  filters: any = {};
  currentUserRole: string | null = null;
  stateConfigMap: Record<SubscriptionState, { label: string; color: string }> = {
    [SubscriptionState.EnAttente]: { label: 'En attente', color: 'warning' },
    [SubscriptionState.Valide]: { label: 'Validé', color: 'success' },
    [SubscriptionState.Desactive]: { label: 'Désactivé', color: 'danger' },
    [SubscriptionState.Refuse]: { label: 'Refusé', color: 'secondary' }
  };
  
  constructor(
    private subscriptionShopService: SubscriptionShopService,
    private shopService: ShopService,
    private userService: UserService,
    private authService : AuthService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

   ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUser()?.role;
    this.loadSubscriptionShops();
    this.loadShops();
    this.loadShopsFilter();
    this.loadUsers();
    this.initForm();
  }

  initForm(): void {
    this.subscriptionShopForm = this.fb.group({
      reference: [''],
      shop_id: ['', Validators.required],
      user_id: ['', Validators.required],
      state: [1]
    });
  }

  loadSubscriptionShops(): void {
    console.log(localStorage.getItem("accessToken"))
    this.loading = true;

    const params = {
      ...this.filters,
      page: this.currentPage,
      limit: this.pageSize
    };

    this.subscriptionShopService.getAll(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.subscriptionShops = res.data;
          this.totalItems = res.total;
          this.totalPages = res.totalPages;
          this.cd.detectChanges();
        }
      });
  }

  loadShops(): void {
    this.shopService.getAllDispo().subscribe({
      next: (data) => {
        this.shops = data;
        this.cd.detectChanges();
      }
    });
  }

 
  loadShopsFilter(): void {
    this.shopService.getAll().subscribe({
      next: (data) => {
        const shopFilter = this.subscriptionShopFilterFields.find(f => f.name === 'shop');
        if (shopFilter) {
          shopFilter.options = data.map(r => ({
            label: r.name,
            value: r._id
          }));
        }

        this.cd.detectChanges();
      }
    });
  }

   loadUsers(): void {
    this.userService.getAllWithoutFilter().subscribe({
      next: (data) => {
        this.users = data;

        const userFilter = this.subscriptionShopFilterFields.find(f => f.name === 'user');
        if (userFilter) {
          userFilter.options = data.map(r => ({
            label: r.username,
            value: r._id
          }));
        }

        this.cd.detectChanges();
      }
    });
  }

  saveSubscriptionShop() {
    if (this.subscriptionShopForm.invalid) return;

    const data = { ...this.subscriptionShopForm.value };

    if (this.isEditMode && this.selectedSubscriptionId) {
      this.subscriptionShopService.update(this.selectedSubscriptionId, data)
        .subscribe(() => this.afterSave());
    } else {
      this.subscriptionShopService.create(data)
        .subscribe(() => this.afterSave());
    }
  }

  afterSave(): void {
    this.loadSubscriptionShops();
    this.closeAddModal();

    this.subscriptionShopForm.reset({
      state: 1
    });

    this.isEditMode = false;
    this.selectedSubscriptionId = null;
  }

  get stateOptions() {
    return [
      { label: 'En attente', value: 1 },
      { label: 'Validé', value: 5 },
      { label: 'Désactivé', value: 0 },
      { label: 'Refusé', value: -1 }
    ];
  }

  // Méthode pour simplifier l'affichage des erreurs
  getControl(name: string) {
    return this.subscriptionShopForm.get(name);
  }

  deleteSubscriptionShop(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette abonnement?')) return;

    this.subscriptionShopService.delete(id).subscribe({
      next: () => {
        this.subscriptionShops = this.subscriptionShops.filter(p => p._id !== id);
        this.loadSubscriptionShops();
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;

    this.subscriptionShopForm.reset({
      reference: '',
      user_id: '',
      shop_id: '',
      state: 1
    });

    this.addModalVisible = true;
  }

  openEditModal(subscriptionShop: SubscriptionShop): void {
    this.isEditMode = true;
    this.selectedSubscriptionId = subscriptionShop._id;

    this.subscriptionShopForm.patchValue({
      reference: subscriptionShop.reference,
      shop_id: subscriptionShop.shop_id?._id,
      user_id: subscriptionShop.user_id?._id,
      state: subscriptionShop.state ?? 1
    });

    this.addModalVisible = true;
  }

  closeAddModal(): void {
    this.addModalVisible = false;
  }
  
  onFilterApplied(data: any) {
    this.filters = data;
    this.currentPage = 1;
    this.loadSubscriptionShops();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  applyFilters() {
    // Ta logique de recherche ici
    console.log("Filtres appliqués");
    this.filtersVisible = false; // Ferme le volet après recherche
  }

  resetFilters() {
    // Remise à zéro des champs
    this.filtersVisible = false;
  }

 get isAdminMall(): boolean {
    return this.currentUserRole === 'Admin mall';
  }

  get isAdminShop(): boolean {
    return this.currentUserRole === 'Admin shop';
  }

  trackById(index: number, item: SubscriptionShop): string {
    return item._id;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSubscriptionShops();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadSubscriptionShops();
    }
  }
}