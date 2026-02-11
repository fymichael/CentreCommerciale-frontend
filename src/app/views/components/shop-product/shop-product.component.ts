import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableModule } from '@coreui/angular';
import { AvatarModule, BadgeModule, ButtonModule, CardModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective} from '@coreui/angular';


@Component({
  selector: 'app-shop-product',
  imports: [CommonModule, ModalModule, IconModule, TableModule, AvatarModule, BadgeModule, ButtonModule, CardModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective],
  templateUrl: './shop-product.component.html',
  styleUrl: './shop-product.component.scss',
})
export class ShopProductComponent {

}
