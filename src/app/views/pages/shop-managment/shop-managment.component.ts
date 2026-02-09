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


@Component({
  selector: 'app-shop-managment',
  standalone: true,
  imports: [
    CardModule, 
    GridModule, 
    TableModule, 
    AvatarModule, 
    IconModule, 
    ButtonModule,
    BadgeModule,
    CommonModule,
    ModalModule
  ],
    templateUrl: './shop-managment.component.html',
  styleUrl: './shop-managment.component.scss',
})
export class ShopManagmentComponent {
  // Données statiques
  shops = [
    {
      name: 'Beauty store',
      owner: 'Rakoto Linda',
      type: 'Textile',
      requestDate: new Date('2024-05-15'),
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    {
      name: 'Vista Tech',
      owner: 'Dupont Jean',
      type: 'Electroménager',
      requestDate: new Date('2024-05-18'),
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4'
    }
  ];
}