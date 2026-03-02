import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// CoreUI
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ContainerComponent,
    RouterLink,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective
  ]
})
export class LoginComponent {

  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd : ChangeDetectorRef
  ) {

    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Si déjà connecté → redirection automatique
    /*if (this.authService.isAuthenticated()) {
      this.redirectByRole();
    }*/
  }

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez compléter les champs';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value)
      .subscribe({
        next: (res) => {
          this.loading = false;   
          this.authService.saveTokens(res);
          this.redirectByRole();
          this.cd.detectChanges();
        },
        error: (err) => {
          this.loading = false; 

          if (err.status === 401) {
            this.errorMessage = err.error?.message ?? 'Identifiants invalides';
          } 
          else if (err.status === 0) {
            this.errorMessage = 'Impossible de contacter le serveur';
          } 
          else {
            this.errorMessage = 'Une erreur inattendue est survenue';
          }
          this.cd.detectChanges();
        }
      });
  }

  private redirectByRole() {
    const role = this.authService.getUserRole();

    if (!role) {
      this.authService.logout();
      return;
    }

    if (role === 'Admin shop') {
      this.router.navigate(['/shop-profile']);
    } 
    else if (role === 'Admin mall') {
      this.router.navigate(['/dashboard']);
    } else if (role === 'Client') {
      this.router.navigate(['https://centre-commerciale-front-office.vercel.app/Home']);
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }
}