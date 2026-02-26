import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../users/services/user.service';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';

// Optionnel pour les toasts
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role_id: ['698f71bf85d4aa5a8e628ca2'],
      state: [1],
      contact: ['034000000']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = { ...this.userForm.value };
    delete data.confirmPassword;
    this.userService.create(data).subscribe({
      next: () => {
        this.successMessage = 'Compte créé avec succès !';
        this.userForm.reset();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur serveur. Veuillez réessayer.';
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  // Méthode pour simplifier l'affichage des erreurs
  getControl(name: string) {
    return this.userForm.get(name);
  }
}