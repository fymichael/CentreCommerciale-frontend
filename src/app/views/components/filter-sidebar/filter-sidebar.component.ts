import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffcanvasModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';

export interface FilterField {
  name: string;        // Nom de la propriété (ex: 'nom')
  label: string;       // Label affiché (ex: 'Nom')
  type: 'text' | 'date' | 'number' | 'select';
  placeholder?: string;
  options?: { label: string, value: any }[]; // Pour les sélecteurs
}

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
  imports: [CommonModule, FormsModule, OffcanvasModule, ButtonModule]
})
export class FilterSidebarComponent {
  @Input() visible = false;
  @Input() title = 'Filtres avancés';
  @Input() fields: FilterField[] = [];
  
  // On utilise un objet pour stocker les valeurs saisies
  filterData: any = {};

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() filterApplied = new EventEmitter<any>();
  @Output() filterReset = new EventEmitter<void>();

  toggleFilters() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  apply() {
    this.filterApplied.emit(this.filterData);
    this.toggleFilters();
  }

  reset() {
    this.filterData = {};
    this.filterReset.emit();
  }
}