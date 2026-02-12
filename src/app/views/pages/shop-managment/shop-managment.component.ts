import { Component } from '@angular/core';
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
import { FilterField, FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';


@Component({
  selector: 'app-shop-managment',
  standalone: true,
  imports: [
    CardModule, 
    GridModule, 
    TableModule, 
    AvatarModule, 
    IconModule, 
    ButtonModule,
    BadgeModule,
    CommonModule,
    ModalModule,
    FilterSidebarComponent
  ],
    templateUrl: './shop-managment.component.html',
  styleUrl: './shop-managment.component.scss',
})
export class ShopManagmentComponent {
    shopFilterFields: FilterField[] = [
    { name: 'shop', label: 'Boutique  ', type: 'text', placeholder: 'Ex: Tech' },
    { name: 'owner', label: 'Propriétaire', type: 'text', placeholder: 'Ex: Jean' },
    { 
      name: 'sector', 
      label: 'Secteur d\'activité', 
      type: 'select', 
      placeholder: 'Choisir le secteur...',
      options: [
        { label: 'Electroménager', value: 'E' },
        { label: 'Textile', value: 'T' }
      ]
    },
    { name: 'dateAdmission', label: "Date d'admission", type: 'date' }
  ];

  // Données statiques
  shops = [
    {
      name: 'Beauty store',
      owner: 'Rakoto Linda',
      type: 'Textile',
      requestDate: new Date('2024-05-15'),
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    {
      name: 'Vista Tech',
      owner: 'Dupont Jean',
      type: 'Electroménager',
      requestDate: new Date('2024-05-18'),
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4'
    }
  ];

  filtersVisible = false;

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  applyFilters() {
    // Ta logique de recherche ici
    console.log("Filtres appliqués");
    this.filtersVisible = false; // Ferme le volet après recherche
  }

  onFilterReset() {
    // Remise à zéro des champs
    this.filtersVisible = false;
  }

  onFilterApplied(data: any) {
  console.log('Données reçues du composant filtre :', data);
  // Logique de filtrage de ta liste ici
}
}