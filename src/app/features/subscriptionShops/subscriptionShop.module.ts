import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionShopRoutingModule } from './subscriptionShop.routing';

@NgModule({
  imports: [
    CommonModule,     
    ReactiveFormsModule,
    SubscriptionShopRoutingModule
  ]
})
export class SubscriptionShopModule {}
