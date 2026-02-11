import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';
import { AvatarModule, BadgeModule, ButtonModule, CardModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableModule } from '@coreui/angular';
import { ColComponent, FormControlDirective, FormDirective, FormLabelDirective, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-stock-managment',
  imports: [CommonModule, ModalModule, AvatarModule, BadgeModule, ButtonModule, CardModule, IconModule, TableModule, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, RowComponent],
  templateUrl: './stock-managment.component.html',
  styleUrl: './stock-managment.component.scss',
})
export class StockManagmentComponent {

}
