import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, ColComponent, RowComponent } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import { BadgeComponent  } from '@coreui/angular';
import { ButtonGroupComponent, ButtonModule } from '@coreui/angular';
@Component({
  selector: 'app-subscription-shop',
  imports: [CommonModule, CardModule, ColComponent, RowComponent, IconModule, RouterLink, BadgeComponent, ButtonGroupComponent, ButtonModule],
  templateUrl: './subscription-shop.component.html',
  styleUrl: './subscription-shop.component.scss',
})
export class SubscriptionShopComponent {
  selectedPlan: string | null = null;
  isAnnual: boolean = false; // false = mensuel, true = annuel

  // Optionnel : un petit calcul pour la réduction
  get priceMultiplier() {
    return this.isAnnual ? 10 : 1; // Exemple : payez 10 mois pour 12 mois
  }
}
