// shop-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarModule, BadgeModule, ButtonModule, CardModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { Tabs2Module, TableModule } from '@coreui/angular';
import { cilBasket, cilSpeedometer, cilTruck } from '@coreui/icons';

@Component({
  selector: 'app-shop-profile',
  standalone: true,
  imports: [
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
    InputGroupTextDirective,
    Tabs2Module,
    TableModule
  ],
  templateUrl: './shop-profile.component.html',
  styleUrl: './shop-profile.component.scss'
})
export class ShopProfileComponent implements OnInit {

  shopProfile = {
    name: 'Tech',
    slogan: "L'innovation à portée de main",
    avatar: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=T',
    ownerName: 'Dupont Jean',
    nif: '1234567890',
    stat: '0987654321',
    contact: '+261 32 12 345 67',
    email: 'contact.tech@example.com',
    shopType: 'Électronique',
    subscriptionType: 'Premium',
    subscriptionStatus: 'actif'
  };

  // Si vous utilisez les Reactive Forms, vous auriez un FormGroup ici
  // shopForm!: FormGroup;

  ngOnInit(): void {
    // Si vous utilisez Reactive Forms
    // this.shopForm = this.fb.group({
    //   ownerName: [this.shopProfile.ownerName],
    //   nif: [this.shopProfile.nif],
    //   // ... autres champs
    // });
  }

  cilBasket = cilBasket;
  cilSpeedometer = cilSpeedometer;
  cilTruck = cilTruck;

    handleChange($event: string | number | undefined) {
      console.log('handleChange', $event);
    }

  modifierAbonnement() {
    console.log("Rediriger vers la page de modification d'abonnement");
    // Ici, vous naviguerez vers la page de sélection des abonnements
    // this.router.navigate(['/shop/subscriptions']);
  }

  enregistrerModifications() {
    console.log("Enregistrer les données du profil de la boutique", this.shopProfile);
    // Ici, vous enverrez les données mises à jour à votre API
  }
}