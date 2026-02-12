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
import { FormModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OffcanvasModule } from '@coreui/angular';
import { FilterField, FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
@Component({
  selector: 'app-user-validation',
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
    FilterSidebarComponent
  ],
    templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss',
})
export class UserManagmentComponent {
  userFilterFields: FilterField[] = [
  { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Ex: Rakoto' },
  { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Ex: Jean' },
  { name: 'cin', label: 'Numéro de CIN', type: 'text', placeholder: '12 chiffres' },
  { name: 'dateAdmission', label: "Date d'admission", type: 'date' }
];

onFilterApplied(data: any) {
  console.log('Données reçues du composant filtre :', data);
  // Logique de filtrage de ta liste ici
}

  // Données statiques
  users = [
    {
      name: 'Linda',
      firstname: 'Rakoto',
      cin: '101 202 303 404',
      requestDate: new Date('2024-05-15'),
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    {
      name: 'Jean',
      firstname: 'Dupont',
      cin: '205 607 809 100',
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

  resetFilters() {
    // Remise à zéro des champs
    this.filtersVisible = false;
  }
}