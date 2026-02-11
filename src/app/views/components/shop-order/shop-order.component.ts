import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';
import { AvatarModule, BadgeModule, ButtonModule, CardModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableModule } from '@coreui/angular';


@Component({
  selector: 'app-shop-order',
  imports: [CommonModule, ModalModule, AvatarModule, BadgeModule, ButtonModule, CardModule, IconModule, TableModule],
  templateUrl: './shop-order.component.html',
  styleUrl: './shop-order.component.scss',
})
export class ShopOrderComponent {

}
