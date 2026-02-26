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
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { finalize } from 'rxjs';
import { Role } from '../../roles/models/role.model';
import { RoleService } from '../../roles/services/role.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
export class UserManagmentComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  loading = false;
  filtersVisible = false;
  userFilterFields: FilterField[] = [
    { name: 'search', label: 'Recherche globale', type: 'text', placeholder: 'Username, email, nom...' },
    { name: 'role', label: 'Rôle', type: 'select', options: [] },
    { name: 'state', label: 'Status', type: 'select', options: [
        { label: 'En attente', value: 1 },
        { label: 'Validé', value: 5 },
        { label: 'Désactivé', value: 0 }
      ]
    },
    { name: 'createdFrom', label: 'Créé du', type: 'date' },
    { name: 'createdTo', label: 'Créé au', type: 'date' }
  ];
  addModalVisible = false;
  isEditMode = false;
  selectedUserId: string | null = null;
  userForm!: FormGroup;
  errorMessage = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  filters: any = {};
  
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

   ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      role_id: ['', Validators.required],
      state: [1],
      contact: ['034000000']
    }, { validators: this.passwordMatchValidator });
  }


passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const form = control as FormGroup;

  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (!password && !confirmPassword) {
    return null;
  }

  if (password !== confirmPassword) {
    form.get('confirmPassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  }

  return null;
}/*
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }*/

  loadUsers(): void {
    this.loading = true;

    const params = {
      ...this.filters,
      page: this.currentPage,
      limit: this.pageSize
    };

    this.userService.getAll(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.users = res.data;
          this.totalItems = res.total;
          this.totalPages = res.totalPages;
          this.cd.detectChanges();
        }
      });
  }
  

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (data) => {
        this.roles = data;

        const roleFilter = this.userFilterFields.find(f => f.name === 'role');
        if (roleFilter) {
          roleFilter.options = data.map(r => ({
            label: r.name,
            value: r._id
          }));
        }

        this.cd.detectChanges();
      }
    });
  }

  saveUser() {
    if (this.userForm.invalid) return;

    const data = { ...this.userForm.value };


    if (this.isEditMode && this.selectedUserId) {
      this.userService.update(this.selectedUserId, data)
        .subscribe(() => this.afterSave());
    } else {
      this.userService.create(data)
        .subscribe(() => this.afterSave());
    }
  }

  afterSave(): void {
    this.loadUsers();
    this.closeAddModal();
    this.userForm.reset();
    this.isEditMode = false;
    this.selectedUserId = null;
  }

  // Méthode pour simplifier l'affichage des erreurs
  getControl(name: string) {
    return this.userForm.get(name);
  }

  deleteUser(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    this.userService.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter(p => p._id !== id);
        this.loadUsers();
      }
    });
  }

  openAddModal(): void {
    this.userForm.reset({
      first_name: '',
      last_name: '',
      birthday: '',
      address: '',
      phone_number: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role_id: '',
      state: 1,
      contact: ''
    });
    this.userForm.get('password')?.setValidators([Validators.required]);
    this.userForm.get('confirmPassword')?.setValidators([Validators.required]);
    this.userForm.updateValueAndValidity();
    this.addModalVisible = true;
  }

  openEditModal(user: User): void {
    this.isEditMode = true;
    this.selectedUserId = user._id;

    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday,
      address: user.address,
      phone_number: user.phone_number,
      username: user.username,
      email: user.email,
      role_id: user.role_id?._id,
      state: user.state,
      contact: user.contact,
      password: '',
      confirmPassword: ''
    });

    this.userForm.get('password')?.clearValidators();
    this.userForm.get('confirmPassword')?.clearValidators();
    this.userForm.updateValueAndValidity();
    this.addModalVisible = true;
  }

  closeAddModal(): void {
    this.addModalVisible = false;
  }
  
  onFilterApplied(data: any) {
    this.filters = data;
    this.currentPage = 1;
    this.loadUsers();
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

  activateUser(user: User): void {
    this.userService.updateState(user._id, 5)
      .subscribe({
        next: () => {
          user.state = 5;
          this.loadUsers();
        }
      });
  }

  deactivateUser(user: User): void {
    this.userService.updateState(user._id, 0)
      .subscribe({
        next: () => {
          user.state = 0;
          this.loadUsers();
        }
      });
  }

  getStateConfig(state: number) {
    switch (state) {
      case 1:
        return { label: 'En attente', color: 'warning' };
      case 5:
        return { label: 'Validé', color: 'success' };
      case 0:
        return { label: 'Désactivé', color: 'danger' };
      default:
        return { label: 'Inconnu', color: 'secondary' };
    }
  }
}