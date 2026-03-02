import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@coreui/angular';
import { AvatarModule, BadgeModule, ButtonModule, CardModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableModule, ButtonDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective
 } from '@coreui/angular';
import { OrderService} from '../../../features/order/services/order-service.service';
import { Order } from '../../../features/order/model/order.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shop-order',
  imports: [CommonModule, ModalModule, AvatarModule, BadgeModule, ButtonModule, CardModule, IconModule, TableModule, ButtonDirective, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective],
  templateUrl: './shop-order.component.html',
  styleUrl: './shop-order.component.scss',
})
export class ShopOrderComponent {
  Orders: Order[] = [];
  currentShopId: string = localStorage.getItem('currentShopId') || '';
  constructor(private orderService: OrderService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrdersByShopId(this.currentShopId).subscribe(
      (orders) => {
        this.Orders = orders as Order[];
        console.log('Orders:', orders);
        this.cd.detectChanges();
      },
      (error) => {
      this.Orders = [];
        console.error('Error loading orders:', error);
        this.cd.detectChanges();
      }
    );
  }

  UpdateToNextStep(currentState: number, orderId: string) {
    const nextState = currentState + 5;
    // Call the service to update the order status
    this.orderService.updateOrderStatus(orderId, nextState).subscribe(
      (response) => {
        console.log('Order status updated:', response);
        this.loadOrders();
        this.cd.detectChanges
      },
      (error) => {
        console.error('Error updating order status:', error);
        this.cd.detectChanges();
      }
    );
  }

  AbortOrder(orderId: string) {
    const nextState = 0;
    // Call the service to update the order status
    this.orderService.updateOrderStatus(orderId, nextState).subscribe(
      (response) => {
        console.log('Order status updated:', response);
        this.loadOrders();
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error updating order status:', error);
        this.cd.detectChanges();
      }
    );
  }

  trackById(index: number, order: Order): string {
    return order._id;
  }
}
