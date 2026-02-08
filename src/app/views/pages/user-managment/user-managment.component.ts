import { Component } from '@angular/core';
import { 
  CardModule, 
  GridModule, 
  TableModule, 
  AvatarModule, 
  ButtonModule ,
  BadgeModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';


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
    CommonModule
  ],
    templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss',
})
export class UserManagmentComponent {
  // Données statiques
  users = [
    {
      name: 'Linda',
      firstname: 'Rakoto',
      cin: '101 202 303 404',
      requestDate: new Date('2024-05-15'),
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    {
      name: 'Jean',
      firstname: 'Dupont',
      cin: '205 607 809 100',
      requestDate: new Date('2024-05-18'),
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4'
    }
  ];
}